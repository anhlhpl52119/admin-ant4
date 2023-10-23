import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

export const columns: TableColumnType<API.GroupDriver>[] = [
  {
    title: 'STT',
    dataIndex: 'indexNum',
    width: '7rem',
    align: 'center',
    fixed: 'left',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];

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
