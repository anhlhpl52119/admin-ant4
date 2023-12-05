import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { EDateFormat } from '@/enums/common.enum';

export const isValidDate = (date: OrNullish<string | number | Dayjs>) => {
  return dayjs(date).isValid();
};

export const formatDate = (date: OrNullish<string | number | Dayjs>, formatType: `${EDateFormat}` = EDateFormat.DATE_HOUR_MINUTE) => {
  if (!isValidDate(date)) {
    return 'Ngày không hợp lệ';
  }

  // unix time
  if (typeof date === 'number' && date.toString().length === 10) {
    return dayjs.unix(date).format(formatType);
  }

  return dayjs(date).format(formatType);
};

export const toUnixTime = (date: OrNullish<string | number | Dayjs>) => {
  if (!isValidDate(date)) {
    return 0;
  }

  return dayjs(date).unix();
};

export const toDayJs = (date: OrNullish<string | number | Dayjs>): Dayjs => {
  if (typeof date === 'number' && date.toString().length === 10) {
    return dayjs.unix(date);
  }

  return dayjs(date);
};

export const dateGap = (from: OrNullish<string | number | Dayjs>, to: OrNullish<string | number | Dayjs>,
  period: 'day' | 'month' | 'year' = 'day'): OrNull<number> => {
  const fromDate = toDayJs(from);
  const toDate = toDayJs(to);
  if (!(isValidDate(fromDate) && isValidDate(toDate))) {
    return null;
  }
  return fromDate.diff(toDate, period);
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

export const getBoundaryDateOfMonth = (period: 'startDate' | 'endDate') => {
  if (!isValidDate(dayjs())) {
    return null;
  }
  switch (period) {
    case 'endDate':
      return dayjs().endOf('M');
    case 'startDate':
      return dayjs().startOf('M');
    default:
      return null;
  }
};
