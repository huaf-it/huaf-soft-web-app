import { Role } from './role';

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  givenName: string;
  lastName: string;
  avatar: string;
  roles: Role[];
  token?: string;
}
