import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { users } from './users';
import { employees } from './employees';

export const images = pgTable('images', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  imageName: text('image_name'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  shopId: uuid('shop_id').references(() => shops.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  employeesId: uuid('employees_id').references(() => employees.id, {
    onDelete: 'cascade',
  }),
});
