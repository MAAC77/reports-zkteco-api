import { Controller, Get, UseGuards } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { AsistenciaService } from './asistencia.service';

@UseGuards(JwtGuard)
@Controller('asistencia')
export class AsistenciaController {
  constructor(private asistenciaServicio: AsistenciaService) {}
  @Get('')
  async getMe(@GetUser() user: Usuario) {
    const idUsuario = user.id;
    return await this.asistenciaServicio.obtenerMarcaciones(idUsuario);
  }
}
