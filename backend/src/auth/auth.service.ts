import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { users } from '../users/schema';

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
        create_at: profile?.create_at,
      };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      throw new Error('Failed to generate access token');
    }
  }
}
