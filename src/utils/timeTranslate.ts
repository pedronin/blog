// перевод времени в читаемый вариант
export const timeTranslate = (At: string): string => {
  const arr = new Date(At).toISOString().replace('-', '.').split('T');
  const time = arr[1].substring(0, 5)[0] === '0' ? arr[1].substring(1, 5) : arr[1].substring(0, 5);
  return arr[0].replace('-', '.') + ' ' + time;
};
