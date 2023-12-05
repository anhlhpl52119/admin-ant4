<template>
  <div md="grid-cols-4" class="grid gap-8 grid-cols-2 cursor-default">
    <!-- Invoice -->
    <div class="card min-h-110 m-0 flex flex-col justify-between bg-#ecf3ff text-#8190e9">
      <div class="line-clamp-2" hover="underline">
        <h3 class="text-16 font-500">
          Hóa đơn chưa xử lý
        </h3>
      </div>
      <ul class="flex-btw-center mt-auto">
        <li>
          <i class=" i-basil:invoice-solid block text-28" />
        </li>
        <li class="text-18 font-800">
          <i v-if="loadingState.unHandledInvoices" class="i-svg-spinners:3-dots-bounce text-20 block" />
          <span v-else>
            {{ state.unHandledInvoices }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Pending Transaction -->
    <div class="card min-h-100 m-0 flex flex-col justify-between bg-#fef5e6 text-#f2bd13">
      <div class="line-clamp-2">
        <h3 class="text-16 font-500">
          Phiếu thanh toán đang chờ
        </h3>
      </div>
      <ul class="flex-btw-center mt-auto">
        <li>
          <i class=" i-tdesign:undertake-transaction block text-28" />
        </li>
        <li class="text-18 font-800">
          <i v-if="loadingState.pendingTransaction" class="i-svg-spinners:3-dots-bounce text-20 block" />
          <span v-else>{{ state.pendingTransaction }}</span>
        </li>
      </ul>
    </div>

    <!-- Total Amount in month -->
    <div class="card min-h-100 m-0 flex flex-col justify-between bg-#e8f7ff">
      <div class="line-clamp-2">
        <h3 class="text-16 font-500">
          {{ `Doanh thu tháng ${CURRENT_MONTH}` }}
        </h3>
      </div>
      <ul class="flex-btw-center mt-auto">
        <li>
          <!-- <i class=" i-tdesign:undertake-transaction block text-28" /> -->
        </li>
        <li class="text-18 font-800">
          <i v-if="loadingState.totalAmountTransactionInMonth" class="i-svg-spinners:3-dots-bounce text-20 block" />
          <span v-else>{{ vndFormat(state.totalAmountTransactionInMonth) }}</span>
        </li>
      </ul>
    </div>

    <!-- Total Amount in month -->
    <div class="card min-h-100 m-0 flex flex-col justify-between bg-#e5fffb text-#3cdbb3">
      <div class="line-clamp-2">
        <h3 class="text-16 font-500">
          Chi nhánh
        </h3>
      </div>
      <ul class="flex-btw-center mt-auto">
        <li>
          <i class=" i-ic:round-store-mall-directory block text-28" />
        </li>
        <li class="text-18 font-800">
          <!-- {{ state }} -->
          2
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { retailerDashboardApis } from '@/apis/retailer/dashboard/dashboard';
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { EDateFormat } from '@/enums/common.enum';
import { formatDate, toUnixTime } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';

const CURRENT_MONTH_START_DATE = dayjs().startOf('M');
const CURRENT_MONTH_END_DATE = dayjs().endOf('M');
const CURRENT_MONTH = dayjs().get('M');

const state = reactive({
  unHandledInvoices: 0,
  pendingTransaction: 0,
  totalAmountTransactionInMonth: 0,
});

const loadingState = reactive({
  unHandledInvoices: false,
  pendingTransaction: false,
  totalAmountTransactionInMonth: false,
});

const getNumberInvoicesOfMonth = async () => {
  loadingState.unHandledInvoices = true;
  const rs = await invoiceApis.search({
    items: 1,
    query: {
      transaction_history_id_not_null: 'true',
      status_eq: 'active',
    },
  });
  loadingState.unHandledInvoices = false;
  if (!rs?.data.total_records) {
    state.unHandledInvoices = 0;
    return;
  }
  state.unHandledInvoices = rs.data.total_records;
};

const getNumberPendingTransactionOfMonth = async () => {
  loadingState.pendingTransaction = true;
  const rs = await transactionHistoryApis.search({
    items: 1,
    query: {
      status_eq: 'pending',
    },
  });
  loadingState.pendingTransaction = false;
  if (!rs?.data.total_records) {
    state.pendingTransaction = 0;
    return;
  }
  state.pendingTransaction = rs.data.total_records;
};

const getTotalAmountTransactionOfMonth = async () => {
  loadingState.totalAmountTransactionInMonth = true;
  const startOfMonthUnix = toUnixTime(CURRENT_MONTH_START_DATE);
  const endOfMonthUnix = toUnixTime(CURRENT_MONTH_END_DATE);

  const rs = await retailerDashboardApis.totalAmountTransaction({
    start_date: Number(startOfMonthUnix),
    end_date: Number(endOfMonthUnix),
  });
  loadingState.totalAmountTransactionInMonth = false;
  if (!rs?.data) {
    return;
  }
  state.totalAmountTransactionInMonth = Number(rs?.data);
};

const init = () => {
  getNumberInvoicesOfMonth();
  getTotalAmountTransactionOfMonth();
  getNumberPendingTransactionOfMonth();
};
init();
</script>
