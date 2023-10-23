import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

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
    dataIndex: 'branch_code',
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
    title: 'Mô tả',
    dataIndex: 'description',
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
    label: 'Tìm theo mã',
    key: 'branch_code_cont',
    value: '',
  },
  {
    label: 'Tìm theo số điện thoại',
    key: 'contact_number_cont',
    value: '',
  },
];
