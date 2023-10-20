import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  calcularDiferencia,
  entreFechas,
  obtenerSeg,
  segundosHM,
} from 'src/lib/date';

const prisma = new PrismaClient();
type Regitro = {
  periodo: string;
  tipo: string;
  diferencia: string | null;
  hora: string;
};
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
                nombre: true,
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
    const datos: { [key: string]: Regitro[] } = registros.reduce(
      (acc, item) => {
        const hEntrada =
          item.horarioUsuario.horario.HorarioDetalle[0].horaEntrada;
        const hSalida =
          item.horarioUsuario.horario.HorarioDetalle[0].horaSalida;
        const entrada: boolean = entreFechas(
          item.hora,
          item.horarioUsuario.horario.HorarioDetalle[0].entradaMinima,
          item.horarioUsuario.horario.HorarioDetalle[0].entradaMaxima,
        );
        if (!acc[item.fecha]) {
          acc[item.fecha] = [];
        }
        if (acc[item.fecha]) {
          const atraso = entrada
            ? calcularDiferencia(hEntrada, item.hora)
            : calcularDiferencia(item.hora, hSalida);
          acc[item.fecha].push({
            periodo: item.horarioUsuario.horario.nombre,
            tipo: entrada ? 'ENTRADA' : 'SALIDA',
            diferencia: atraso.includes('-') ? atraso.replace('-', '') : null,
            hora: item.hora,
          });
        }
        return acc;
      },
      {},
    );
    const minAtraso = Object.values(datos).reduce((sum, item) => {
      const tempMin = item.reduce(
        (acc, it) => (it.diferencia ? obtenerSeg(it.diferencia) + acc : acc),
        0,
      );
      return sum + tempMin;
    }, 0);
    const data = {
      registros: datos,
      minAtraso: segundosHM(minAtraso),
    };
    return data;
  }
}
