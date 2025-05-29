import { InferInsertModel } from 'drizzle-orm';
import { roles } from 'src/database';

export type InsertRoles = InferInsertModel<typeof roles>;

export type Roles = Pick<InsertRoles, 'name'>;
