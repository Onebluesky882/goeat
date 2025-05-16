import { sql } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const shops = pgTable('shops', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  ownerId: text('owner_id'),
  address: text('address'),
  phone: text('phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  active: boolean('active').default(true),
});
