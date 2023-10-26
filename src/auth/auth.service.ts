import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { use } from 'passport';
import { RolEnum, Usuario } from '@prisma/client';

export type Pagination = {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
};
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegistrarUsuarioDto) {
    const password = await argon.hash(dto.nroDocumento);
    await this.prisma.usuario
      .create({
        data: {
          ...dto,
          usuario: dto.nroDocumento,
          password,
          rol: RolEnum.USUARIO,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              `Ya existen registros con el mismo valor en el campo ${error.meta?.target}`,
            );
          }
        }
        throw new InternalServerErrorException(error.meta.cause);
      });

    return { mensaje: 'Usuario registrado' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.usuario.findFirst({
      where: { usuario: dto.usuario },
    });

    if (!user) throw new ForbiddenException('Usuario o email incorrecto');

    const pwCompare = await argon.verify(user.password, dto.password);
    if (!pwCompare) throw new ForbiddenException('Usuario o email incorrecto');
    const usuario = {
      name: `${user.nombres} ${user.primerApellido} ${user.segundoApellido}`,
      email: user.email,
      id: user.id,
      rol: user.rol,
    };
    return await this.signToken(user.id, usuario);
  }

  async me(idUsuario: string) {
    const user = await this.prisma.usuario.findFirst({
      where: { id: idUsuario },
    });
    return {
      ...user,
      name: `${user.nombres} ${user.primerApellido} ${user.segundoApellido}`,
      create_at: user.createdAt,
      updated_at: user.updatedAt,
      status: 'ACTIVO',
    };
  }

  async users(
    pagination: Pagination,
  ): Promise<{ data: Usuario[]; pagination: Pagination }> {
    const users = await this.prisma.usuario.findMany({
      take: Number(pagination.perPage),
      skip: (+pagination.page - 1) * +pagination.perPage,
    });
    const total = await this.prisma.usuario.count();
    const lastPage = Math.round(total / pagination.perPage);
    return {
      data: users.map((user) => ({
        ...user,
        name: `${user.nombres} ${user.primerApellido} ${user.segundoApellido}`,
      })),
      pagination: { total, lastPage, perPage: pagination.perPage, page: 1 },
    };
  }

  async signToken(userId: string, user: any): Promise<object> {
    const payload = {
      sub: userId,
      user,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '180m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      token,
    };
  }
}
