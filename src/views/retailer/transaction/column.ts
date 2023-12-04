import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useTableMethod';

export const searchFilterRaw: QueriesRaw<API.GroupDriver>[] = [
  {
    label: 'Tìm theo tên',
    key: 'name_cont',
    value: '',
  },
  {
    label: 'Tìm theo email',
    key: 'email_cont',
    value: '',
  },
  {
    label: 'Tìm theo trạng thái',
    key: 'status_cont',
    value: '',
  },
];
