<template>
  <div>
    <ASpin size="large" :spinning="loadIdsHas(EApiId.DRIVER_SEARCH)">
      <ADescriptions
        :bordered="true"
        size="small"
        class="cursor-default"
      >
        <ADescriptionsItem label="Tên tài xế" :span="2">
          {{ driverState?.name || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Status">
          <DynamicTag :status="driverState?.status" />
        </ADescriptionsItem>
        <ADescriptionsItem label="Số điện thoại" :span="2">
          {{ driverState?.phone || '_' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Email">
          {{ driverState?.email || '' }}
        </ADescriptionsItem>
        <ADescriptionsItem label="Ngày chỉnh sửa">
          {{ formatDate(driverState?.updated_at) }}
          <div class="text-gray">
            ({{ timeFromNow(driverState?.updated_at) }})
          </div>
        </ADescriptionsItem>
      </ADescriptions>
      <div class="mt-16">
        <ATabs v-model:activeKey="activeKey" type="card">
          <ATabPane key="1">
            <template #tab>
              <div class="mr-20">
                <ABadge :count="driverInvoiceUnpaid" :offset="[20, 0]">
                  <span class="text-spotlight">Hóa đơn mới</span>
                </ABadge>
              </div>
            </template>
            <template #default>
              <div class="max-h-450 overscroll-y-auto">
                {{ driverInvoices.records }}
              </div>
            </template>
          </ATabPane>

          <ATabPane key="2">
            <template #tab>
              <div class="mr-20">
                <ABadge :count="driverTransactionPending" :offset="[20, 0]">
                  <span class="text-spotlight">Phiếu thanh toán đang chờ</span>
                </ABadge>
              </div>
            </template>
            <pre>{{ driverTransaction.records }}</pre>
          </ATabPane>
        </ATabs>
      </div>
    </ASpin>
  </div>
</template>

<script lang="ts" setup>
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { EApiId } from '@/enums/request.enum';
import { formatDate, timeFromNow } from '@/utils/date.util';
import { useDriverCache } from '@/composable/object-cache/useDriverCache';

const props = defineProps<{
  driverId: string
  showRecentTransaction?: boolean
  showRecentInvoices?: boolean
}>();

const emits = defineEmits<{
  cancel: [v: void] // use for close modal if this component use in AppModal
}>();

const { getDriverTransactions, getDriverInvoices, countDriverInvoices, countDriverTransactions } = useDriverCache();
const { driverId } = toRefs(props);

const activeKey = ref('1');
const driverState = ref<API.Driver>();
const driverInvoiceUnpaid = ref<number>(0);
const driverTransactionPending = ref<number>(0);
const driverInvoices = reactive({
  records: [] as API.SourceInvoice[],
  total: 0,
});

const driverTransaction = reactive({
  records: [] as API.TransactionHistory[],
  total: 0,
});

const { loadIdsHas } = storeToRefs(useLoaderStore());

const getDriverLatestInvoices = async (driverId: string) => {
  const rs = await invoiceApis.search({
    query: {
      driver_id_eq: driverId,
      status_eq: 'active',
      transaction_history_id_null: 'true',
      s: 'invoice_date desc',
    },
    items: 10,
  });
  const invoices = rs?.data?.source_invoices;
  if (!invoices || invoices.length === 0) {
    return;
  }
  driverInvoices.records = invoices;
  driverInvoices.total = rs.data.total_records;
};

const getDriverLatestTransaction = async (driverId: string) => {
  const rs = await transactionHistoryApis.search({
    query: {
      driver_id_eq: driverId,
      s: 'transaction_date desc',
    },
  });
  const transactions = rs?.data?.transaction_histories;
  if (!transactions || transactions.length === 0) {
    return;
  }
  driverTransaction.records = transactions;
  driverTransaction.total = rs.data.total_records;
};
const getDriverInfo = async (driverId: string): Promise<boolean> => {
  const rs = await retailerDriverApis.searchMyDrivers({
    query: {
      id_eq: driverId,
    },
  });
  if (!(rs && rs.data) || rs.data.drivers.length === 0) {
    // server error or can't fetch driver Id
    return false;
  }
  [driverState.value] = rs.data.drivers;
  return true;
};

const init = async () => {
  if (!await getDriverInfo(driverId.value)) {
    emits('cancel');
    await showAsyncAlert({ content: 'Không thể tải thông tin tài xế, xin hãy thử lại', severity: 'error' });
    return;
  }
  props.showRecentInvoices && getDriverLatestInvoices(driverId.value);
  props.showRecentTransaction && getDriverLatestTransaction(driverId.value);

  driverInvoiceUnpaid.value = await countDriverInvoices(driverId.value, 'unpaid');
  driverTransactionPending.value = await countDriverTransactions(driverId.value, 'pending');
};

watchEffect(async () => {
  if (!driverId.value) {
    emits('cancel');
    await showAsyncAlert({ content: 'Không tìm thấy mã định danh của tài xế', severity: 'error' });
    return;
  }
  init();
});
</script>
