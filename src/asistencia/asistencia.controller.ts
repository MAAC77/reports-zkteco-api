import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolEnum, Usuario } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AsistenciaService } from './asistencia.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/rol.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('asistencia')
export class AsistenciaController {
  constructor(private asistenciaServicio: AsistenciaService) {}

  @Get('')
  @Roles(RolEnum.USUARIO)
  async getMe(@GetUser() user: Usuario) {
    const idUsuario = user.id;
    return await this.asistenciaServicio.obtenerMarcaciones(idUsuario);
  }
}
