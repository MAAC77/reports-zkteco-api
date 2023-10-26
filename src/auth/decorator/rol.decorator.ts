import { SetMetadata } from '@nestjs/common';
import { RolEnum } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RolEnum[]) => SetMetadata(ROLES_KEY, roles);
