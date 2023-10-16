import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class AsistenciaService {
  async obtenerMarcaciones(idUsuario: string) {
    const registros = await prisma.marcacion.findMany({
      select: {
        hora: true,
        fecha: true,
        horarioUsuario: {
          select: {
            horario: {
              select: {
                HorarioDetalle: {
                  select: {
                    entradaMaxima: true,
                    entradaMinima: true,
                    horaEntrada: true,
                    horaSalida: true,
                    salidaMaxima: true,
                    salidaMinima: true,
                  },
                },
              },
            },
          },
        },
      },
      where: { idUsuario },
    });
    console.log(registros);
    return registros;
  }
}
