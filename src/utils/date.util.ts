import dayjs from 'dayjs';
import type { EDateFormat } from '@/enums/common.enum';

export const formatDate = (date: OrNullish<string | number | Date>, formatType: `${EDateFormat}` = 'DD-MM-YYYY HH:mm') => {
  if (!dayjs(date).isValid()) {
    return 'Ngày không hợp lệ';
  }

  return dayjs(date).format(formatType);
};
