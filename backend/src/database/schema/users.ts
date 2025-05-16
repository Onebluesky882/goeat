import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull(), // Required
  name: text('name'),
  createAt: timestamp('create_at').notNull().defaultNow(),
  active: boolean('active').default(false),
  role: text('role'),
});
