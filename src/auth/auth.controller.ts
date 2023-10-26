import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guard';
import { RolesGuard } from './guard/roles.guard';
import { RolEnum } from '@prisma/client';
import { Roles } from './decorator/rol.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registrar')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolEnum.ADMINISTRADOR)
  register(@Body() dto: RegistrarUsuarioDto) {
    return this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
