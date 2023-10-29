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
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    ellipsis: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    ellipsis: true,
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
