import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema, users } from 'src/database';
import { json } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION) private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
  ) {}

  async validateOrCreate(user: any) {
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

      return {
        access_token: token,
      };
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }
  async login({ username, password }: { username: string; password: string }) {
    // Replace this with your real user validation logic
    if (username !== 'test' || password !== '1234') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
