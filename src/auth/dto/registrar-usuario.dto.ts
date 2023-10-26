import { RolEnum } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegistrarUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  nroDocumento: string;

  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsEnum(RolEnum)
  rol: RolEnum;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  primerApellido?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  segundoApellido?: string;
}
