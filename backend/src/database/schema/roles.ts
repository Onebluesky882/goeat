import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  position: text('position').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
