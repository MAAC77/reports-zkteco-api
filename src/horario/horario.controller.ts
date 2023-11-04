import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolEnum } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/rol.decorator';
import { CrearHorarioDto } from './dto/crear-horario.dto';
import { HorarioService } from './horario.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('asistencia-config')
export class HorarioController {
  constructor(private horarioServicio: HorarioService) {}

  @Post('/horario')
  @Roles(RolEnum.ADMINISTRADOR)
  async crearHorario(@Body() datos: CrearHorarioDto) {
    return await this.horarioServicio.guardarHorario(datos);
  }
}
