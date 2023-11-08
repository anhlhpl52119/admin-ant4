import dayjs from 'dayjs';
import type { EDateFormat } from '@/enums/common.enum';

export const formatDate = (date: OrNullish<string | number | Date>, formatType: `${EDateFormat}` = 'DD-MM-YYYY HH:mm') => {
  if (!dayjs(date).isValid()) {
    return 'Ngày không hợp lệ';
  }

  return dayjs(date).format(formatType);
};

export const timeFromNow = (date: OrNullish<string | number | Date>) => {
  if (!dayjs(date).isValid()) {
    return 'Ngày không hợp lệ';
  }
  return dayjs(date).fromNow();
};

export const isFiveMinutesAgo = (date: OrNullish<string | number | Date>) => {
  if (!dayjs(date).isValid()) {
    return false;
  }
  const fiveMinutesAgo = dayjs().subtract(5, 'minute');
  return dayjs(date).isSameOrAfter(dayjs(fiveMinutesAgo));
};
