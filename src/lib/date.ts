function getDate(fecha: string): [number, number] {
  const [h1, m1] = fecha.split(':');
  return [+h1, +m1];
}

export function tiempoAleatorio(max: number, min: number) {
  const hrs = Math.floor(Math.random() * (max - min + 1) + min);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? '0' : '';
  const mFormat = mins < 10 ? '0' : '';
  return `${hFormat + hrs + ':' + mFormat + mins}`;
}

export function calcularDiferencia(fecha1: string, fecha2: string) {
  const [h1, m1] = getDate(fecha1);
  const [h2, m2] = getDate(fecha2);
  const diff = +h1 * 3600 + +m1 * 60 - (+h2 * 3600 + +m2 * 60);
  return segundosHM(diff);
}

export function calcularDiferenciaNumber(
  fecha1: string,
  fecha2: string,
): number {
  const [h1, m1] = getDate(fecha1);
  const [h2, m2] = getDate(fecha2);
  const diff = h1 * 3600 + m1 * 60 - (h2 * 3600 + m2 * 60);
  return diff;
}

export function obtenerSeg(fecha: string): number {
  const [hh, mm] = getDate(fecha);
  return hh * 3600 + mm * 60;
}

export function segundosHM(secs: number) {
  function z(n: number) {
    return (n < 10 ? '0' : '') + n;
  }
  const sign = secs < 0 ? '-' : '';
  secs = Math.abs(secs);
  return sign + z((secs / 3600) | 0) + ':' + z(((secs % 3600) / 60) | 0);
}

export function entreFechas(
  fecha: string,
  fechaIni: string,
  fechaFin: string,
): boolean {
  return (
    calcularDiferenciaNumber(fechaIni, fecha) < 0 &&
    calcularDiferenciaNumber(fecha, fechaFin) < 0
  );
}

export function sumarFecha(fecha1: string, fecha2: string) {
  const [h1, m1] = getDate(fecha1);
  const [h2, m2] = getDate(fecha2);
  const sum = +h1 * 3600 + +m1 * 60 + h2 * 3600 + m2 * 60;
  return segundosHM(sum);
}
