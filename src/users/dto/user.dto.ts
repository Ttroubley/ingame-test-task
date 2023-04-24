import { IsNotEmpty } from 'class-validator';
import { Role } from '../../auth/roles-guard/roles.enum';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  roles: Role[];
}
