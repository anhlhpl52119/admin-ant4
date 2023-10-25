import type { TableColumnType } from 'ant-design-vue';
import type { QueriesRaw } from '@/composable/useCommonTableMethod';

export const columns: TableColumnType<API.RetailerUser>[] = [
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
    title: 'Phân quyền',
    dataIndex: 'role',
    ellipsis: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: 'Đổi mật khẩu gần nhất',
    dataIndex: 'default_password_changed_at',
    ellipsis: true,
  },
  {
    dataIndex: 'edit',
    width: '6rem',
    fixed: 'right',
  },
];

export const searchFilterRaw: QueriesRaw<API.RetailerUser>[] = [
  {
    label: 'Tìm theo email',
    key: 'email_cont',
    value: '',
  },
  {
    label: 'Tìm theo số điện thoại',
    key: 'phone_cont',
    value: '',
  },
];
