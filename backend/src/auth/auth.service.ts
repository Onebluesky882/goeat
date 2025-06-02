import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema, users } from 'src/database';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION) private db: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) {}

  async validateOrCreate(user: any, res: Response) {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    if (!existing) {
      await this.db.insert(users).values({
        email: user.email,
        username: user.username,
      });
    }

    try {
      const payload = {
        id: existing?.id,
        email: existing?.email,
        username: existing?.username,
      };

      const token = this.jwtService.sign(payload);

      res.cookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 วัน
      });
      return { access_token: token };
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }

  async validateUser(email: string, password: string) {
    // 1. check user
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // bcrypt.compare is async!
    const matches = await bcrypt.compare(password, user.password as string);
    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //3. replace stack value
    const { password: _p, ...safeUser } = user;
    return safeUser;
  }
  signToken(payload: { id: string; email: string; name?: string }) {
    return this.jwtService.sign(payload);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      id: user?.id,
      email: user?.email,
      username: user?.username,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
