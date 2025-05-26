import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { users } from '../database';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export type SelectUsers = InferSelectModel<typeof users>;
export type InsertUsers = InferInsertModel<typeof users>;

export type CreateUser = Pick<InsertUsers, 'email' | 'password' | 'name'>;

export class CreateUserDto implements CreateUser {
  @IsEmail()
  email!: InsertUsers['email'];

  @IsNotEmpty()
  @MinLength(8)
  password!: InsertUsers['password'];

  @IsNotEmpty()
  name!: InsertUsers['name'];
}
