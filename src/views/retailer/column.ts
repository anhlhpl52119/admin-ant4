import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

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
  },
  {
    title: 'Mã',
    dataIndex: 'retailer_code',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
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
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Sync status',
    dataIndex: 'sync_status',
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
