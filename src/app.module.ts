import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
// import { UserModule } from './user/user.module';
// import { ClassModule } from './class/class.module';
// import { StudentModule } from './student/student.module';
// import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsuarioModule,
    AsistenciaModule,
  ],
})
export class AppModule {}
