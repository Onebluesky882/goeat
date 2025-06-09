import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
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
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getProfile(userId: string) {
    const rows = await this.db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return rows[0];
  }

  async createUser(data: CreateUserDto) {
    const saltRounds = 12;
    const hashed = await bcrypt.hash(data.password, saltRounds);

    try {
      const [inserted] = (await this.db
        .insert(users)
        .values({
          email: data.email,
          username: data.username,
          password: hashed,
        })
        .returning()) as any[];

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
