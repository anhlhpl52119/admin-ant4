import type { QueriesRaw } from '@/composable/useTableMethod';

export const searchFilterRaw: QueriesRaw<API.Retailer>[] = [

  {
    label: 'Tìm theo mã',
    key: 'retailer_code_cont',
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
