import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { users } from './schema';
import { CreateUserDto } from './user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getAllUsers() {
    return this.db.query.users.findMany();
  }

  async insertUser(email: string, name: string) {
    const newUser = {
      email,
      name,
    };
    return this.db.insert(users).values(newUser).returning();
  }
}
