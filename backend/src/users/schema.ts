import { randomUUID } from 'crypto';
import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_uuid_random()`), // Required
  email: text('email').notNull(), // Required
  name: text('name'), // Optional?
  created_at: timestamp('created_at').defaultNow(), // Optional if default is set
});
