export const isNumeric = (str: string | number) => {
  const parseNum = Number(str);

  return !Number.isNaN(parseNum);
};

export const stringToNumber = (strNum: OrNullish<string | number>): number => {
  if (!(strNum && isNumeric(strNum))) {
    return 0;
  }

  return Number(strNum);
};

export const percentFormat = (num: number | string): string => {
  return `${stringToNumber(num).toString()}%`;
};

export const vndFormat = (num: OrNullish<number | string>): string => {
  if (!num) {
    const zero = 0;

    return zero.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
  }

  if (num && isNumeric(num)) {
    return num.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
    });
  }

  return 'Invalid';
};
