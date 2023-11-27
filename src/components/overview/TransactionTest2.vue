<template>
  <ATable
    :dataSource="invoices"
    :pagination="false"
    bordered
    class="cursor-default"
    size="small"
  >
    <ATableColumn key="code" title="Mã hóa đơn" :ellipsis="true" fixed="left" :width="130">
      <template #default="{ record }: {record: API.SourceInvoice}">
        {{ record?.source_invoice_code || '_' }}
      </template>
    </ATableColumn>
    <ATableColumn key="invoice_date" title="Ngày lập hóa đơn" :ellipsis="true" align="center">
      <template #default="{ record }: {record: API.SourceInvoice}">
        {{ formatDate(record?.invoice_date) || '_' }}
      </template>
    </ATableColumn>
    <ATableColumn key="amount" title="Tổng hóa đơn" :ellipsis="true" align="right">
      <template #default="{ record }: {record: API.SourceInvoice}">
        {{ vndFormat(record?.total_amount) || '_' }}
      </template>
    </ATableColumn>
    <ATableColumn key="commission" title="Hoa hồng" :ellipsis="true" align="right">
      <template #default="{ record }: {record: API.SourceInvoice}">
        {{ vndFormat(invoiceNetTake(record)) || '_' }}
      </template>
    </ATableColumn>
    <template #summary>
      <ATableSummary fixed>
        <ATableSummaryRow class="bg-#fafafa">
          <ATableSummaryCell>
            <span class="text-spotlight">Tổng cộng</span>
            <div class="text-desc">
              ({{ invoices.length }} hóa đơn)
            </div>
          </ATableSummaryCell>
          <ATableSummaryCell :colSpan="3" align="right">
            <span class="text-spotlight"> {{ vndFormat(transactionDetails?.total_amount) }}</span>
          </ATableSummaryCell>
        </ATableSummaryRow>
      </ATableSummary>
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { formatDate } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';
import { invoiceNetTake } from '@/composable/useCommonComposable';

const props = defineProps<{
  transactionId: string
}>();
const emits = defineEmits<{
  success: [v: string]
  cancel: []
}>();

const transactionDetails = ref<API.TransactionHistory>();
const invoices = computed(() => transactionDetails.value?.source_invoices || []);
const driver = computed(() => transactionDetails.value?.driver || null);

const getTransactionById = async (id: string) => {
  if (!id) { return; }

  const rs = await transactionHistoryApis.getDetail(id, { includes: ['driver', 'source_invoices'] });

  if (!(rs && rs.data)) {
    await showAsyncAlert({ content: rs?.message || 'Lỗi tải thông tin giao dịch!', severity: 'error' });
    emits('cancel'); // force close modal
    return;
  }

  transactionDetails.value = rs.data;
};
const init = () => {
  getTransactionById(props.transactionId);
};
init();
</script>
