import type { SelectProps } from 'ant-design-vue';

export const DEFAULT_ROUTE_PATH = '/dashboard/page1';

export const COMMON_SUCCESS_MSG = {
  update: 'Cập nhật thành công!',
  delete: 'Xóa thành công!',
  create: 'Thêm mới thành công!',
};

export const COMMON_ERROR_MSG = {
  update: 'Cập nhật thất bại.',
  delete: 'Xóa thất bại.',
  create: 'Thêm mới thất bại.',
};

export const VIEW_BY_OPTIONS: SelectProps['options'] = [
  {
    value: 10,
    label: '10 / Trang',
  },
  {
    value: 20,
    label: '20 / Trang',
  },
  {
    value: 30,
    label: '30 / Trang',
  },
  {
    value: 40,
    label: '40 / Trang',
  },
];
