import { PrismaClient } from '@prisma/client';
import { cargarUsuarios } from './usuarios';
import { cargarHorarios } from './horario';
import { cargarRegistros } from './registros';

const prisma = new PrismaClient();

async function main() {
  await cargarUsuarios();
  await cargarHorarios();
  await cargarRegistros();
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
