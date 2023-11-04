import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cargarUnidades() {
  await prisma.unidad.deleteMany();

  console.log('Seeding unidades...');

  const unidades = [
    {
      nombre: 'Mecánica Industrial',
    },
    {
      nombre: 'Química Industrial',
    },
    {
      nombre: 'Mecánica Industrial',
    },
    {
      nombre: 'Elctricidad Industrial',
    },
    {
      nombre: 'Metalurgia, Siderurgia y Fundición',
    },
    {
      nombre: 'Electrónica',
    },
    {
      nombre: 'Industria textil y confección',
    },
    {
      nombre: 'Administrativo',
    },
    {
      nombre: 'Academico',
    },
  ];

  for (const unidad of unidades) {
    await prisma.unidad.create({
      data: { nombre: unidad.nombre },
    });
  }
}
