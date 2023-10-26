import { RolEnum } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegistrarUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  nroDocumento: string;

  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  @IsEnum(RolEnum)
  rol: RolEnum;

  @IsNotEmpty()
  @IsOptional()
  primerApellido?: string;

  @IsNotEmpty()
  @IsOptional()
  segundoApellido?: string;
}
