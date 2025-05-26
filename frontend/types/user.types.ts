import type { InsertUsers } from "../../backend/dist/src/users/user.dto";
export type CreateUser = Pick<InsertUsers, "email" | "password" | "name">;
