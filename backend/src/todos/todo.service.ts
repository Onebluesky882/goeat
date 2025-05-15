import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_CONNECTION } from 'src/database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class TodoService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}
  async getTodo() {
    return this.database.query.todos.findMany();
  }
}
