import type { TableColumnType } from 'ant-design-vue';

export const columns: TableColumnType<Branch>[] = [
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
