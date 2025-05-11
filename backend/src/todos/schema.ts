import { pgTable, uuid, text, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const todos = pgTable('todos', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  complete: boolean('complete').notNull().default(false),
});
