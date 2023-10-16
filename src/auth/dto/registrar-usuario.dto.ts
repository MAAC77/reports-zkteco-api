import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegistrarUsuarioDto {
  @IsEmail()
  email: string;

  //   @IsNotEmpty()
  //   @MinLength(8)
  //   password: string;

  // @Field({ nullable: true })
  // firstname?: string;

  // @Field({ nullable: true })
  // lastname?: string;

  @IsNotEmpty()
  @MinLength(5)
  nroDocumento: string;

  @IsNotEmpty()
  nombres: string;

  @IsNotEmpty()
  primerApellido?: string;

  @IsNotEmpty()
  segundoApellido?: string;
}
