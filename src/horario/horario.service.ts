import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CrearHorarioDto } from './dto/crear-horario.dto';

const prisma = new PrismaClient();

@Injectable()
export class HorarioService {
  async guardarHorario(datos: CrearHorarioDto) {
    const horario = await prisma.horario.create({
      data: { nombre: datos.descripcion, descripcion: datos.descripcion },
    });

    for (const detalle of datos.detalle) {
      await prisma.horarioDetalle.create({
        data: {
          ...detalle,
          idHorario: horario.id,
        },
      });
    }
    return horario;
  }
}
