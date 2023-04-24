import { Role } from '../roles-guard/roles.enum';

export interface JwtPayload {
  username: string;
  sub: string;
  roles: Role[];
}
