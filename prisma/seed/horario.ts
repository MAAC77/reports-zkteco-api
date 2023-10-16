import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cargarHorarios() {
  await prisma.horario.deleteMany();
  await prisma.horarioDetalle.deleteMany();

  console.log('Seeding...');

  const horarios = [
    {
      nombre: 'Mañana',
      descripcion: 'Horario turno mañana',
      detalle: {
        horaEntrada: '08:00',
        horaSalida: '12:00',
        entradaMinima: '06:00',
        entradaMaxima: '10:00',
        salidaMinima: '10:01',
        salidaMaxima: '14:00',
        tolerancia: 5,
      },
    },
    {
      nombre: 'Tarde',
      descripcion: 'Horario turno tarde',
      detalle: {
        horaEntrada: '14:00',
        horaSalida: '18:00',
        entradaMinima: '13:00',
        entradaMaxima: '15:00',
        salidaMinima: '16:00',
        salidaMaxima: '20:00',
        tolerancia: 5,
      },
    },

    {
      nombre: 'Noche',
      descripcion: 'Horario turno noche',
      detalle: {
        horaEntrada: '18:00',
        horaSalida: '22:00',
        entradaMinima: '16:00',
        entradaMaxima: '20:00',
        salidaMinima: '20:01',
        salidaMaxima: '24:00',
        tolerancia: 5,
      },
    },
  ];

  const usuariosList = await prisma.usuario.findMany();
  for (const horario of horarios) {
    const horarioResult = await prisma.horario.create({
      data: { nombre: horario.nombre, descripcion: horario.descripcion },
    });
    await prisma.horarioDetalle.create({
      data: { ...horario.detalle, idHorario: horarioResult.id },
    });
    const dataHorarioUsuario = usuariosList.map((usuario) => ({
      idUsuario: usuario.id,
      idHorario: horarioResult.id,
    }));
    await prisma.horarioUsuario.createMany({ data: dataHorarioUsuario });
  }
}
