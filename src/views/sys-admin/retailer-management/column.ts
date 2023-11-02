import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useTableMethod';

export const columns: TableColumnType<API.Retailer>[] = [
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
    title: 'Mã',
    dataIndex: 'retailer_code',
    ellipsis: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
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
    title: 'Mô tả',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Sync status',
    dataIndex: 'sync_status',
    ellipsis: true,
  },
  {
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];

export const searchFilterRaw: QueriesRaw<API.Retailer>[] = [

  {
    label: 'Tìm theo mã',
    key: 'retailer_code_cont',
    value: '',
  },
  {
    label: 'Tìm theo email',
    key: 'email_cont',
    value: '',
  },
  {
    label: 'Tìm theo địa chỉ',
    key: 'address_cont',
    value: '',
  },
];
