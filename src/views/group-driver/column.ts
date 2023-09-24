import type { TableColumnType } from 'ant-design-vue';

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
    title: 'Mã',
    dataIndex: 'code',
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
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];
