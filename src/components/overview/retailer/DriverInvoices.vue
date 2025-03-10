<template>
  <ATabs v-model:activeKey="activeKey" type="card">
    <ATabPane key="1" tab="Hóa đơn mới">
      Content of Tab Pane 1
    </ATabPane>
    <ATabPane key="2" tab="Hóa đơn hoa hồng">
      Content of Tab Pane 2
    </ATabPane>
  </ATabs>
</template>

<script lang="ts" setup>
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';

const props = defineProps<{
  driverId: string
}>();

const { driverId } = toRefs(props);
const activeKey = ref('1');

const driverInvoices = reactive({
  records: [] as API.SourceInvoice[],
  total: 0,
});

/**
 * Get latest invoice of driver by driver id request params
 * - order date descending
 */
const getDriverUnpaidInvoiceParams: API.SearchSourceInvoiceQueryParams['query'] = {
  driver_id_eq: props.driverId,
  transaction_history_id_null: 'true',
  s: 'invoice_date desc',
};

/**
 * Get latest transaction of pending status by driver id
 * - order date descending
 */
const getDriverTransactionIsPending: API.SearchTransactionQueryParams['query'] = {
  driver_id_eq: props.driverId,
  transaction_history_code_not_null: 'true',
  status_eq: 'pending',
  s: 'transaction_date desc',
};

const getTotalDriverInvoceCount = async (driverId: string): Promise<number> => {
  const rs = await invoiceApis.search({
    items: 1,
    page: 1,
    query: {
      driver_id_eq: driverId,
    },
  });
  if (!rs?.data?.total_records) {
    return 0;
  }
  return rs.data.total_records;
};

const fetchDriverLatestUnpaidInvoice = async (page: number = 1) => {
  /**
   * TODO: get total unpaid to manage "Create Transaction" button state
   */
  const rs = await invoiceApis.search({
    items: 10,
    page,
    query: getDriverUnpaidInvoiceParams,
  });

  const invoices = rs?.data?.source_invoices;
  if (!invoices || invoices.length === 0) { return; }

  driverInvoices.records = invoices;
  driverInvoices.total = rs.data.total_records;
};

const fetchDriverPendingTransaction = async (page: number = 1) => {
  /**
   * TODO: get total pending to visible badge on tab
   * + get first record of "transaction_date" to show timeFromNow() to show last time paid
   */
  const rs = await transactionHistoryApis.search({
    items: 10,
    page,
    query: getDriverTransactionIsPending,
  });
};
</script>
