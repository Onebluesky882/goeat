import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema, users } from 'src/database';
import { json, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION) private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
  ) {}

  async validateOrCreate(user: any, res: Response) {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    if (!existing) {
      await this.db.insert(users).values({
        email: user.email,
        name: user.name,
      });
    }

    const profile = await this.db.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    try {
      const payload = {
        id: profile?.id,
        email: profile?.email,
        name: profile?.name,
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
}
