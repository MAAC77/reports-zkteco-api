import { PrismaClient, Prisma } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

export async function cargarUsuarios() {
  await prisma.usuario.deleteMany();
  // await prisma.post.deleteMany();

  console.log('Seeding...');

  const usuarioAdmin: Prisma.UsuarioCreateInput = {
    usuario: '2163147',
    nombres: 'Idalina',
    primerApellido: 'Endrizzi',
    segundoApellido: 'Durkin',
    nroDocumento: '2163147',
    email: 'idurkin0@springer.com',
    role: 'ADMIN',
    password: await argon.hash('2163147'),
  };
  const usuarios = [
    {
      usuario: '1178499',
      nombres: 'Alano',
      primerApellido: 'Belamy',
      segundoApellido: 'Leaf',
      nroDocumento: '1178499',
      email: 'aleaf0@virginia.edu',
    },
    {
      usuario: '8638404',
      nombres: 'Baird',
      primerApellido: "O'Heaney",
      segundoApellido: 'Breeder',
      nroDocumento: '8638404',
      email: 'bbreeder1@jimdo.com',
    },
    {
      usuario: '4894493',
      nombres: 'Tedman',
      primerApellido: 'Geraldi',
      segundoApellido: 'Caley',
      nroDocumento: '4894493',
      email: 'tcaley2@ihg.com',
    },
    {
      usuario: '4011283',
      nombres: 'Ric',
      primerApellido: 'Johannes',
      segundoApellido: 'Fassmann',
      nroDocumento: '4011283',
      email: 'rfassmann3@youtube.com',
    },
    {
      usuario: '6381910',
      nombres: 'Maynord',
      primerApellido: 'Capenor',
      segundoApellido: 'Cruddace',
      nroDocumento: '6381910',
      email: 'mcruddace4@skyrock.com',
    },
    {
      usuario: '4477350',
      nombres: 'Rachele',
      primerApellido: 'Derry',
      segundoApellido: 'Tallquist',
      nroDocumento: '4477350',
      email: 'rtallquist5@oakley.com',
    },
    {
      usuario: '3664438',
      nombres: 'Aluin',
      primerApellido: 'Tapenden',
      segundoApellido: 'Thorsen',
      nroDocumento: '3664438',
      email: 'athorsen6@facebook.com',
    },
    {
      usuario: '4582878',
      nombres: 'Dexter',
      primerApellido: 'Seeley',
      segundoApellido: 'MacGill',
      nroDocumento: '4582878',
      email: 'dmacgill7@mediafire.com',
    },
    {
      usuario: '5222240',
      nombres: 'Ema',
      primerApellido: 'Glisane',
      segundoApellido: 'Baskerfield',
      nroDocumento: '5222240',
      email: 'ebaskerfield8@wikispaces.com',
    },
    {
      usuario: '4911046',
      nombres: 'Bengt',
      primerApellido: 'Bloxham',
      segundoApellido: 'Golsworthy',
      nroDocumento: '4911046',
      email: 'bgolsworthy9@cloudflare.com',
    },
    {
      usuario: '5390235',
      nombres: 'Erick',
      primerApellido: 'Calbreath',
      segundoApellido: 'Mustill',
      nroDocumento: '5390235',
      email: 'emustilla@toplist.cz',
    },
    {
      usuario: '1769774',
      nombres: 'Wadsworth',
      primerApellido: 'Astill',
      segundoApellido: 'Spring',
      nroDocumento: '1769774',
      email: 'wspringb@pcworld.com',
    },
    {
      usuario: '9140518',
      nombres: 'Hynda',
      primerApellido: 'Albany',
      segundoApellido: 'Godlonton',
      nroDocumento: '9140518',
      email: 'hgodlontonc@cbslocal.com',
    },
    {
      usuario: '8869083',
      nombres: 'Tomlin',
      primerApellido: 'Duddin',
      segundoApellido: 'Cauthra',
      nroDocumento: '9140518',
      email: 'tcauthrad@simplemachines.org',
    },
    {
      usuario: '6985583',
      nombres: 'Veradis',
      primerApellido: 'Hengoed',
      segundoApellido: 'Dingley',
      nroDocumento: '6985583',
      email: 'vdingleye@ed.gov',
    },
    {
      usuario: '4582175',
      nombres: 'Zachariah',
      primerApellido: 'Sydney',
      segundoApellido: 'Gioani',
      nroDocumento: '4582175',
      email: 'zgioanif@rakuten.co.jp',
    },
    {
      usuario: '1963263',
      nombres: 'Aggy',
      primerApellido: 'Grindley',
      segundoApellido: 'Markos',
      nroDocumento: '4582175',
      email: 'amarkosg@ustream.tv',
    },
    {
      usuario: '2137587',
      nombres: 'Townsend',
      primerApellido: 'Pedrazzi',
      segundoApellido: 'Housecraft',
      nroDocumento: '2137587',
      email: 'thousecrafth@shutterfly.com',
    },
    {
      usuario: '8818269',
      nombres: 'Zorine',
      primerApellido: 'Blade',
      segundoApellido: 'Blaksland',
      nroDocumento: '8818269',
      email: 'zblakslandi@google.com',
    },
    {
      usuario: '7739434',
      nombres: 'Inglebert',
      primerApellido: 'Selkirk',
      segundoApellido: 'Frensch',
      nroDocumento: '7739434',
      email: 'ifrenschj@furl.net',
    },
  ];

  await prisma.usuario.create({
    data: { ...usuarioAdmin },
  });
  for (const item of usuarios) {
    const password = await argon.hash(item.nroDocumento);
    await prisma.usuario.create({
      data: { ...item, role: 'USER', password },
    });
  }
}
