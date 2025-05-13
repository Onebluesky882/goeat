import { users } from './schema';

export type User = {
  id: string;
  email: string;
  createdAt: Date;
};

//from db  to dto
export function mapUserDbToDto(dbUser: typeof users.$inferSelect): User {
  return {
    id: dbUser.id,
    email: dbUser.email as string,
    createdAt: dbUser.created_at!,
  };
}
// to db
export function mapUserDtoToDb(
  user: Partial<User>,
): Partial<typeof users.$inferInsert> {
  return {
    id: user.id,
    email: user.email,
    created_at: user.createdAt,
  };
}
