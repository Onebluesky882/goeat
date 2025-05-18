import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InferSelectModel } from 'drizzle-orm';
import { users } from 'src/database';

export type Users = InferSelectModel<typeof users>;
