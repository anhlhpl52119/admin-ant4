<template>
  <div md="grid-cols-4" class="grid gap-8 grid-cols-2">
    <template v-for="item in renderItem" :key="item.id">
      <div class="card min-h-100 m-0 flex flex-col justify-between" :class="item.className">
        <div class="line-clamp-2">
          <h3 class="text-16 font-500">
            {{ item.name }}
          </h3>
        </div>
        <ul class="flex-btw-center mt-auto">
          <li>
            <i class="block text-28" :class="item.icon" />
          </li>
          <li class="text-18 font-800">
            {{ item.value }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { retailerDashboardApis } from '@/apis/retailer/dashboard/dashboard';
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { EDateFormat } from '@/enums/common.enum';
import { formatDate } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';

const state = reactive({
  unHandledInvoices: 0,
  pendingTransaction: 0,
  currentMonthTransactionAmount: 0,
});
const CURRENT_MONTH_START_DATE = dayjs().startOf('M');
const CURRENT_MONTH_END_DATE = dayjs().endOf('M');

const renderItem = computed(() => [
  {
    id: '1',
    name: 'Hóa đơn chưa xử lý',
    icon: 'i-basil:invoice-solid',
    className: 'bg-#ecf3ff text-#8190e9',
    value: state.unHandledInvoices,
  },
  {
    id: '2',
    name: 'Phiếu thanh toán đang chờ',
    icon: 'i-tdesign:undertake-transaction',
    className: 'bg-#fef5e6 text-#f2bd13',
    value: state.pendingTransaction,
  },
  {
    id: '3',
    name: 'Tổng tiền đã thanh toán trong tháng 11',
    icon: '',
    className: 'bg-#e8f7ff',
    value: vndFormat(state.currentMonthTransactionAmount),
  },
  {
    id: '4',
    name: 'Chi nhánh',
    icon: 'i-ic:round-store-mall-directory',
    className: 'bg-#e5fffb text-#3cdbb3',
    value: '2',
  },
]);
const getNumberInvoicesOfMonth = async () => {
  const rs = await invoiceApis.search({
    items: 1,
    query: {
      transaction_history_id_not_null: 'true',
      status_eq: 'active',
      // invoice_date_gteq: formatDate(CURRENT_MONTH_START_DATE, EDateFormat.DATE_API_QUERY), // start date
      // invoice_date_lteq: formatDate(CURRENT_MONTH_END_DATE, EDateFormat.DATE_API_QUERY), // end date
    },
  });
  if (!rs?.data.total_records) {
    state.unHandledInvoices = 0;
    return;
  }
  state.unHandledInvoices = rs.data.total_records;
};

const getNumberPendingTransactionOfMonth = async () => {
  const rs = await transactionHistoryApis.search({
    items: 1,
    query: {
      status_eq: 'pending',
    },
  });
  if (!rs?.data.total_records) {
    state.unHandledInvoices = 0;
    return;
  }
  state.pendingTransaction = rs.data.total_records;
};
const getTotalTransactionOfMonth = async () => {
  // const startOfMonthUnix = formatDate(CURRENT_MONTH_START_DATE, EDateFormat.UNIX_TIME);
  // const endOfMonthUnix = formatDate(CURRENT_MONTH_END_DATE, EDateFormat.UNIX_TIME);

  // const rs = await retailerDashboardApis.totalAmountTransaction({
  //   start_date: Number(startOfMonthUnix),
  //   end_date: Number(endOfMonthUnix),
  // });

  // if (!rs?.data) {
  //   return;
  // }
  // state.currentMonthTransactionAmount = Number(rs?.data);

  // TEMP___________
  state.currentMonthTransactionAmount = Number('3897000.0');
};

// const get;
const init = () => {
  getNumberInvoicesOfMonth();
  getNumberPendingTransactionOfMonth();
  getTotalTransactionOfMonth();
};
init();
</script>
