import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService, Pagination } from './auth.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guard';
import { RolesGuard } from './guard/roles.guard';
import { RolEnum, Usuario } from '@prisma/client';
import { Roles } from './decorator/rol.decorator';
import { GetUser } from './decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/auth/registrar')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolEnum.ADMINISTRADOR)
  async register(@Body() dto: RegistrarUsuarioDto) {
    return await this.authService.register(dto);
  }

  @Get('/me')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RolEnum.ADMINISTRADOR, RolEnum.USUARIO)
  async me(@GetUser() user: Usuario) {
    return await this.authService.me(user.id);
  }

  @Get('/users')
  @UseGuards(JwtGuard, RolesGuard)
  // @Roles(RolEnum.ADMINISTRADOR)
  async users(@Query() pagination: Pagination) {
    return await this.authService.users(pagination);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
