import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { users } from '../users/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async validateGoogleUser(profile: any) {
    const existing = await this.db.query.users.findFirst({
      where: eq(users.email, profile.email),
    });

    if (existing) {
      const token = this.jwtService.sign({ sub: existing.id });
      return { user: existing, token };
    }

    const id = profile.id;
    const email = profile.email;

    try {
      const [newUser] = await this.db
        .insert(users)
        .values({
          id,
          email,
        })
        .returning();

      console.log('newUser:', newUser);

      const token = this.jwtService.sign({ sub: newUser.id });
      return { user: newUser, token };
    } catch (error) {
      console.error('Error inserting user:', error);
      throw new Error('Database insertion failed');
    }
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.googleId };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
