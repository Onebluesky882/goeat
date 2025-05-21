import { Request } from 'express';

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
