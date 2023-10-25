import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

export const columns = ref<TableColumnType<API.Branch>[]>([
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
    resizable: true,
    maxWidth: 600,
    minWidth: 100,
    width: 300,
  },
  {
    title: 'Mã',
    dataIndex: 'branch_code',
    ellipsis: true,
    resizable: true,
    maxWidth: 600,
    minWidth: 100,
    width: 300,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'contact_number',
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ellipsis: true,
  },

  {
    title: 'Mô tả',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    ellipsis: true,
  },
  {
    dataIndex: 'edit',
    width: '6rem',
    // fixed: 'right',
  },
]);

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
