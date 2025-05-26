import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { users } from '../database/schema/users';
import { schema } from 'src/database';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getProfile(user: { id: string }) {
    const rows = await this.db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, user.id));
    return rows[0];
  }

  async createUser(data: CreateUserDto) {
    const saltRounds = 12;
    const hashed = await bcrypt.hash(data.password, saltRounds);

    try {
      const [inserted] = await this.db
        .insert(users)
        .values({
          email: data.email,
          name: data.name,
          password: hashed,
        })
        .returning();

      const { password, ...userWithoutPassword } = inserted;
      return userWithoutPassword;
    } catch (error) {
      throw new HttpException(
        'Could not create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
