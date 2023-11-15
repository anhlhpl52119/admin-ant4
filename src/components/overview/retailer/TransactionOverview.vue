<template>
  <div class="pt-20">
    <ASpin :spinning="loading">
      <div class="flex-btw-center">
        <div>
          <span class="text-spotlight text-24">Mã thanh toán #{{ transactionInfo?.transaction_history_code || '-' }}</span>
          <span class="text-desc text-12 ml-7">{{ formatDate(transactionInfo?.transaction_date) || '' }}</span>
        </div>

        <div>
          <DynamicTag v-if="transactionInfo?.status !== 'pending'" :status="transactionInfo?.status" />
          <div v-else>
            <span class="mr-5">Đã thanh toán</span>
            <ATooltip title="Đánh dấu hóa đơn này đã thanh toán" arrowPointAtCenter>
              <ASwitch :checked="transactionStatus" @change="onChange" />
            </ATooltip>
          </div>
        </div>
      </div>

      <div>
        <span>Ngày Tạo: <strong>{{ formatDate(transactionInfo?.created_at) }}</strong></span>
      </div>
      <div>
        <span>Chỉnh sửa:  <strong>{{ formatDate(transactionInfo?.updated_at) }}</strong></span>
      </div>
      <div>
        <span class="text-desc text-12"> {{ transactionInfo?.description ?? '' }}</span>
      </div>
      <ADivider />
      <div>
        <div>
          <span class="text-spotlight text-primary  text-24 ml-7 hover:underline cursor-pointer" @click="showDriverInfo(transactionInfo?.driver?.id ?? '')">{{ transactionInfo?.driver?.name || '-' }}</span>
          <span class="text-desc text-12 ml-7">({{ transactionInfo?.driver?.phone || '-' }})</span>
        </div>
      </div>

      <ATable
        :dataSource="invoicesList"
        :pagination="false"
        bordered
        class="cursor-default"
        :scroll="{ y: '20rem' }"
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
        <ATableColumn key="roses" title="Hoa hồng" :ellipsis="true" align="right">
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
                  ({{ invoicesList.length }} hóa đơn)
                </div>
              </ATableSummaryCell>
              <ATableSummaryCell :colSpan="3" align="right">
                <span class="text-spotlight"> {{ vndFormat(transactionInfo?.total_amount) }}</span>
              </ATableSummaryCell>
            </ATableSummaryRow>
          </ATableSummary>
        </template>
      </ATable>
    </ASpin>
  </div>
</template>

<script lang="ts" setup>
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { formatDate } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';
import { invoiceNetTake } from '@/composable/useCommonComposable';

const props = defineProps<{
  id: string
}>();

const emits = defineEmits<{
  forceFetchList: [v?: boolean]
}>();

const DriverInfo = defineAsyncComponent(() => import('@/components/common/DriverInfo.vue'));

const transactionInfo = ref<OrNull<API.TransactionHistory>>(null);
const loading = ref<boolean>(false);
const invoicesList = computed(() => {
  if (!(transactionInfo.value && transactionInfo.value.source_invoices)) {
    return [];
  }
  return transactionInfo.value.source_invoices;
});

const transactionStatus = computed(() => transactionInfo?.value?.status !== 'pending');

const showDriverInfo = (driverId: string) => {
  const modalId = coreModal.show({
    component: DriverInfo,
    props: {
      driverId,
      hideExtraBtn: true,
    },
  });
};

const init = async () => {
  loading.value = true;
  const rs = await transactionHistoryApis.getDetail(props.id, { includes: ['driver', 'source_invoices'] });
  if (!(rs && rs.data)) {
    return;
  }
  transactionInfo.value = rs.data;
  loading.value = false;
};

const onChange = async () => {
  const confirm = await showAsyncAlert({
    content: 'Sau khi hóa đơn này được dánh dấu là Hoàn tất bạn không thể chình sửa',
    strictMsg: true,
  });
  if (!confirm) {
    return;
  }
  loading.value = true;
  const rs = await transactionHistoryApis.complete(transactionInfo?.value?.id ?? '');
  if (!(rs && rs.data)) {
    loading.value = false;
    return;
  }
  init();
  emits('forceFetchList', true);
};

init();
</script>
