import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { EDateFormat } from '@/enums/common.enum';

export const formatDate = (date: OrNullish<string | number | Dayjs>, formatType: `${EDateFormat}` = EDateFormat.DATE_HOUR_MINUTE) => {
  if (!dayjs(date).isValid()) {
    return 'Ngày không hợp lệ';
  }

  return dayjs(date).format(formatType);
};

export const toUnixTime = (date: OrNullish<string | number | Dayjs>) => {
  if (!dayjs(date).isValid()) {
    return 0;
  }

  return Number(dayjs(date).format('X'));
};

export const timeFromNow = (date: OrNullish<string | number | Dayjs>) => {
  if (!dayjs(date).isValid()) {
    return 'Ngày không hợp lệ';
  }
  return dayjs(date).fromNow();
};

export const isFiveMinutesAgo = (date: OrNullish<string | number | Dayjs>) => {
  if (!dayjs(date).isValid()) {
    return false;
  }
  const fiveMinutesAgo = dayjs().subtract(5, 'minute');
  return dayjs(date).isSameOrAfter(dayjs(fiveMinutesAgo));
};

export const isValidDate = (date: OrNullish<string | number | Dayjs>) => {
  return dayjs(date).isValid();
};
