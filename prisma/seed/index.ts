import { PrismaClient } from '@prisma/client';
import { cargarUsuarios } from './usuarios';
import { cargarHorarios } from './horario';
import { cargarRegistros } from './registros';
import { cargarUnidades } from './unidades';

const prisma = new PrismaClient();

async function main() {
  await cargarUsuarios();
  await cargarUnidades();
  // await cargarHorarios();
  // await cargarRegistros();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
