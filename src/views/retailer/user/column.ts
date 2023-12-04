import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useTableMethod';

export const searchFilterRaw: QueriesRaw<API.RetailerUser>[] = [
  {
    label: 'Tìm theo email',
    key: 'email_cont',
    value: '',
  },
  {
    label: 'Tìm theo số điện thoại',
    key: 'phone_cont',
    value: '',
  },
];
