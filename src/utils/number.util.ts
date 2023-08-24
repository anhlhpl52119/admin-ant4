export const isNumeric = (str: string) => {
  const parseNum = Number(str);
  return !Number.isNaN(parseNum);
};
export const percentFormat = (num: number): string => {
  return `${num.toString()}%`;
};
export const stringToNumber = (strNum: string | null | undefined): number => {
  if (!(strNum && isNumeric(strNum))) {
    return 0;
  }

  return Number(strNum);
};

export const vndFormat = (num: number): string => {
  return num.toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
};
