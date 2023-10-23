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
    title: 'Phân quyền',
    dataIndex: 'role',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Đổi mật khẩu gần nhất',
    dataIndex: 'default_password_changed_at',
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
