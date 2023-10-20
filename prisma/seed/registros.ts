import { PrismaClient } from '@prisma/client';
import { tiempoAleatorio } from '../../src/lib/date';

const prisma = new PrismaClient();

export async function cargarRegistros() {
  console.log('Seeding...');

  const horarioMañana = await prisma.horarioUsuario.findFirst({
    where: { horario: { nombre: 'Mañana' } },
  });
  const horarioTarde = await prisma.horarioUsuario.findFirst({
    where: { horario: { nombre: 'Tarde' } },
  });
  const usuariosList = await prisma.usuario.findMany();
  for (const usuario of usuariosList) {
    for (let i = 1; i <= 30; i++) {
      await prisma.marcacion.create({
        data: {
          fecha: `${i}/10/2023`,
          hora: tiempoAleatorio(8, 7),
          idUsuario: usuario.id,
          idHorarioUsuario: horarioMañana.id,
        },
      });
      await prisma.marcacion.create({
        data: {
          fecha: `${i}/10/2023`,
          hora: tiempoAleatorio(12, 13),
          idUsuario: usuario.id,
          idHorarioUsuario: horarioMañana.id,
        },
      });
      await prisma.marcacion.create({
        data: {
          fecha: `${i}/10/2023`,
          hora: tiempoAleatorio(13, 14),
          idUsuario: usuario.id,
          idHorarioUsuario: horarioTarde.id,
        },
      });
      await prisma.marcacion.create({
        data: {
          fecha: `${i}/10/2023`,
          hora: tiempoAleatorio(17, 18),
          idUsuario: usuario.id,
          idHorarioUsuario: horarioTarde.id,
        },
      });
    }
  }

  //   const horarios = [
  //     {
  //       fecha: '01/02/2023',
  //       idHorario: horarioMañana.id,
  //       marcacion:
  //     },
  //     {
  //       nombre: 'Tarde',
  //       descripcion: 'Horario turno tarde',
  //       detalle: {
  //         horaEntrada: '14:00',
  //         horaSalida: '18:00',
  //         entradaMinima: '13:00',
  //         entradaMaxima: '15:00',
  //         salidaMinima: '16:00',
  //         salidaMaxima: '20:00',
  //         tolerancia: 5,
  //       },
  //     },

  //     {
  //       nombre: 'Noche',
  //       descripcion: 'Horario turno noche',
  //       detalle: {
  //         horaEntrada: '18:00',
  //         horaSalida: '22:00',
  //         entradaMinima: '16:00',
  //         entradaMaxima: '20:00',
  //         salidaMinima: '20:01',
  //         salidaMaxima: '24:00',
  //         tolerancia: 5,
  //       },
  //     },
  //   ];

  //   const usuariosList = await prisma.usuario.findMany();
  //   for (const horario of horarios) {
  //     const horarioResult = await prisma.horario.create({
  //       data: { nombre: horario.nombre, descripcion: horario.descripcion },
  //     });
  //     await prisma.horarioDetalle.create({
  //       data: { ...horario.detalle, idHorario: horarioResult.id },
  //     });
  //     const dataHorarioUsuario = usuariosList.map((usuario) => ({
  //       idUsuario: usuario.id,
  //       idHorario: horarioResult.id,
  //     }));
  //     await prisma.horarioUsuario.createMany({ data: dataHorarioUsuario });
  //   }
}
