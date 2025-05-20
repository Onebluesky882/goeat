import { sql } from 'drizzle-orm';

import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const employees = pgTable('employees', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone'),
  period: date('period'),
  emergency: text('emergency'),
  emergencyContact: text('emergency_contact'),
  agentId: uuid('agent_id'),
  active: boolean('active').default(false),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
});
