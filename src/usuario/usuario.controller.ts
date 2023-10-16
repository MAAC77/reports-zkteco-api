import { Controller, Get, UseGuards } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsuarioController {
  @Get('/me')
  getMe(@GetUser() user: Usuario) {
    return user;
  }
}
