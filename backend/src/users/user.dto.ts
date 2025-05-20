import { InferSelectModel } from 'drizzle-orm';
import { users } from 'src/database';

export type Users = InferSelectModel<typeof users>;
