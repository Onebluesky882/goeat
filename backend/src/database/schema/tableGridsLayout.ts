import { sql } from 'drizzle-orm';

import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { shops } from './shops';

export const tableGridLayout = pgTable('table_grids_layout', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  rows: text('rows'),
  columns: text('columns'),
  shopId: uuid('shop_id').references(() => shops.id),
});
