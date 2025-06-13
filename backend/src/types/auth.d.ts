import { Request } from 'express';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  imageUrl: string | null;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
