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

    try {
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
      };
    } catch (error) {
      console.error('❌ JWT sign error:', error);
      throw new Error('Failed to generate access token');
    }
  }
}
