import { Role } from './role';
import {Division} from "./division";

export class User {
  id: number;
  code: string;
  username: string;
  email: string;
  password?: string;
  givenName: string;
  lastName: string;
  fullName?: string;
  avatar?: string;
  divisions?: Array<Division>
  roles: Role[];
  token?: string;
  expires?: number;
}
