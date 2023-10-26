import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

export const columns: TableColumnType<API.Branch>[] = [
  {
    title: 'STT',
    dataIndex: 'indexNum',
    width: '7rem',
    align: 'center',
    fixed: 'left',
    responsive: ['lg'],
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: 'Mã',
    dataIndex: 'code',
    responsive: ['lg'],
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    responsive: ['md'],
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    responsive: ['md'],
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    responsive: ['lg'],
  },
  {
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];

export const searchFilterRaw: QueriesRaw<API.Driver>[] = [

  {
    label: 'Tìm theo mã',
    key: 'driver_code_cont',
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
