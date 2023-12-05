<template>
  <ADescriptions
    :bordered="true"
    size="small"
    class="cursor-default"
  >
    <ADescriptionsItem label="Mã hóa đơn" :span="2">
      {{ invoiceState?.source_invoice_code || '-' }}
    </ADescriptionsItem>
    <ADescriptionsItem label="Trạng thái" :span="1">
      <FieldDynamicTag :status="invoiceState?.status" />
    </ADescriptionsItem>
    <ADescriptionsItem label="Tài xế" :span="2">
      {{ driverState?.name || '-' }}
    </ADescriptionsItem>
    <ADescriptionsItem label="Số điện thoại" :span="1">
      {{ driverState?.phone || '-' }}
    </ADescriptionsItem>
    <ADescriptionsItem label="Ngày Lập hóa đơn" :span="3">
      <ul class="text-right">
        <li>
          {{ formatDate(invoiceState?.invoice_date) }}
        </li>
        <li class="text-gray">
          {{ timeFromNow(invoiceState?.invoice_date) }}
        </li>
      </ul>
    </ADescriptionsItem>
    <ADescriptionsItem label="Tổng giá trị" :span="1" class="">
      <div class="text-nowrap">
        {{ vndFormat(invoiceState?.total_amount) }}
      </div>
    </ADescriptionsItem>
    <ADescriptionsItem label="Phần trăm hoa hồng" :span="1">
      <div class="text-nowrap">
        {{ invoiceState?.commission_rate || 0 }}%
      </div>
    </ADescriptionsItem>
    <ADescriptionsItem label="Hoa hồng" :span="1">
      {{ vndFormat(invoiceNetTake(invoiceState)) }}
    </ADescriptionsItem>
  </ADescriptions>
</template>

<script lang="ts" setup>
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { formatDate, timeFromNow } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';
import { invoiceNetTake } from '@/composable/useCommonComposable';

const props = defineProps<{
  invoiceId: string
}>();

const emits = defineEmits<{
  cancel: [] // use for close modal
}>();

const { invoiceId } = toRefs(props);

const invoiceState = ref<API.SourceInvoice>();
const driverState = computed(() => invoiceState.value?.driver);

const getInvoiceById = async (id: string) => {
  const rs = await invoiceApis.search({
    items: 1,
    includes: ['driver'],
    query: {
      id_eq: id,
    },
  });
  if (!(rs && rs?.data?.source_invoices?.length > 0)) {
    emits('cancel');
    return;
  }
  [invoiceState.value] = rs.data.source_invoices;
};

watchEffect(() => {
  if (!invoiceId.value) {
    emits('cancel');
    return;
  }
  getInvoiceById(invoiceId.value);
});
</script>
