import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const RolesGuard = (...roles: Role[]) => SetMetadata('roles', roles);
