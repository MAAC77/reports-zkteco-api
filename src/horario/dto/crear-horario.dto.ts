export class CrearHorarioDto {
  nombre: string;
  descripcion: string;
  detalle: CrearHorarioDetalleDto[];
}

export class CrearHorarioDetalleDto {
  horaEntrada: string;
  horaSalida: string;
  entradaMaxima: string;
  entradaMinima: string;
  salidaMaxima: string;
  salidaMinima: string;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  tolerancia: number;
}
