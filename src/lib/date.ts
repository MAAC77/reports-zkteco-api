export function tiempoAleatorio(max: number, min: number) {
  const hrs = Math.floor(Math.random() * (max - min + 1) + min);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? '0' : '';
  const mFormat = mins < 10 ? '0' : '';
  return `${hFormat + hrs + ':' + mFormat + mins}`;
}
