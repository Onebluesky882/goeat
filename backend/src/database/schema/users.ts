import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(), // Required
  name: text('name'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  active: boolean('active').default(false),
  roleId: uuid('role_id'),
  imageUrl: text('image_url'),
  updatedAt: timestamp('updated_at'),
});
