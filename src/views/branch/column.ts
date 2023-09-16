import type { TableColumnType } from 'ant-design-vue';

export const columns: TableColumnType<Branch>[] = [
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
