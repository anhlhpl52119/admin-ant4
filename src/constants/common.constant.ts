import type { SelectProps } from 'ant-design-vue';
import { ERole } from '@/enums/common.enum';

export const DEFAULT_ROUTE_PATH = '/dashboard/page1';

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // 7 days
export const UNIX_TIMESTAMP_12_HOURS = 60 * 60 * 24; // 24 hours

export const DEFAULT_ROLE_ROUTE = {
  [ERole.ADMIN]: '/retailer/management',
  [ERole.RETAILER_USER]: '/transaction/transaction-management',
  [ERole.DRIVER]: '/transaction/transaction-management',
  [ERole.RETAILER_MANAGER]: '/dashboard/overview',
};

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

export const FALLBACK_PAGINATION_API_RESPONSE = {
  records: [],
  current_page: 1,
  total_page: 10,
  total_records: 0,
};

export const GENERAL_EMAIL_DOMAIN = ['gmail.com', 'icloud.com', 'outlook.com', 'facebook.com', 'yahoo.com'];

export const UNHANDLED_SERVER_ERROR = 'Lỗi không xác định từ server';

export const CALENDAR_LABELS = {
  MONTH_FROM_1_TO_12: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  MONTH_FROM_1_TO_6: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
  MONTH_FROM_7_TO_12: ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
};

const data = {

  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ],

};
