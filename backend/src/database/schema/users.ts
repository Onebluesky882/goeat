import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { roles } from './roles';
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(), // Required
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  active: boolean('active').default(false),

  imageUrl: text('image_url'),
  updatedAt: timestamp('updated_at'),
  username: text('username').notNull(),
  birthday: text('birthday'),
  phone: text('phone'),
  emergency: text('emergency'),
  emergencyContact: text('emergency_contact'),
  agentId: uuid('agent_id'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  roleId: uuid('role_id').references(() => roles.id),
});
