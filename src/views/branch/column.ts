import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useTableMethod';

export const columns: TableColumnType<API.Branch>[] = [
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
    dataIndex: 'code',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'contact_number',
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
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];

export const searchFilterRaw: QueriesRaw<API.Branch>[] = [

  {
    label: 'Tìm theo mã',
    key: 'code_cont',
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
