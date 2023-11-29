<template>
  <div>
    <ATable
      id="table-fixed-height"
      :dataSource="driverInvoices"
      bordered
      :loading="loadIdsHas(EApiId.INVOICE_SEARCH)"
      :pagination="false"
      class="cursor-default"
      :scroll="{ y: '30rem' }"
      size="small"
    >
      <ATableColumn key="check" :ellipsis="true" fixed="left" :width="50" align="center">
        <template #title>
          <ATooltip
            :mouseEnterDelay="0.5"
            :title="isCheckAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả hóa đơn'"
            color="blue-inverse"
          >
            <ACheckbox
              :checked="isCheckAll"
              :indeterminate="isSelectHalf"
              :disabled="driverInvoices.length === 0"
              @update:checked="onCheckAll($event)"
            />
          </ATooltip>
        </template>
        <template #default="{ record }: {record: API.SourceInvoice}">
          <ACheckbox :checked="selectedInvoiceMap.has(record.id)" @update:checked="onSelectInvoice(record)" />
        </template>
      </ATableColumn>
      <ATableColumn key="code" title="Mã hóa đơn" :ellipsis="true" fixed="left" :width="130">
        <template #default="{ record }: {record: API.SourceInvoice}">
          {{ record?.source_invoice_code || '_' }}
        </template>
      </ATableColumn>
      <ATableColumn key="create_date" title="Ngày lập" :ellipsis="true" align="center">
        <template #default="{ record }: {record: API.SourceInvoice}">
          <ul>
            <li> {{ formatDate(record?.invoice_date) || '_' }}</li>
            <li class="text-12 text-gray">
              {{ timeFromNow(record?.invoice_date) }}
            </li>
          </ul>
        </template>
      </ATableColumn>
      <ATableColumn key="amount" title="Tổng hóa đơn" :ellipsis="true" align="right">
        <template #default="{ record }: {record: API.SourceInvoice}">
          {{ vndFormat(record?.total_amount) || '_' }}
        </template>
      </ATableColumn>
      <ATableColumn key="commission" title="Hoa hồng" :ellipsis="true" align="right" :width="85">
        <template #default="{ record }: {record: API.SourceInvoice}">
          {{ percentFormat(record?.commission_rate ?? '') }}
        </template>
      </ATableColumn>
      <ATableColumn key="netTake" title="Tài xế hưởng" :ellipsis="true" align="right">
        <template #default="{ record }: {record: API.SourceInvoice}">
          {{ vndFormat(invoiceNetTake(record)) }}
        </template>
      </ATableColumn>
      <template #summary>
        <ATableSummary fixed>
          <ATableSummaryRow class="bg-#fafafa">
            <ATableSummaryCell :colSpan="2">
              <ul class="h-40">
                <li class="text-spotlight">
                  Tạm tính
                </li>
                <li v-if="!!selectedInvoiceMap.size" class="text-desc">
                  {{ selectedInvoiceMap.size }} hóa đơn
                </li>
              </ul>
            </ATableSummaryCell>
            <ATableSummaryCell :colSpan="5" align="right">
              <span class="text-spotlight"> {{ vndFormat(totalSelectedInvoicesAmount) }}</span>
            </ATableSummaryCell>
          </ATableSummaryRow>
        </ATableSummary>
      </template>
      <template #emptyText>
        <div class="flex-center h-270">
          <i class="i-svg:empty text-20 text-desc inline-block mr-8" />
          <span>Không tìm thấy hóa đơn nào chờ thanh toán cho tài xế </span>
        </div>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
import { EApiId } from '@/enums/request.enum';
import { formatDate, timeFromNow } from '@/utils/date.util';
import { percentFormat, vndFormat } from '@/utils/number.util';
import { invoiceNetTake } from '@/composable/useCommonComposable';
import { useDriverCache } from '@/composable/object-cache/useDriverCache';

const props = defineProps<{
  driverId: string
}>();

const { loadIdsHas } = storeToRefs(useLoaderStore());
const { getDriverInvoices } = useDriverCache();
const { driverId } = toRefs(props);

const selectedInvoiceMap = reactive<Map<string, API.SourceInvoice>>(new Map()); // invoice_id -> invoice item
const driverInvoices = ref<API.SourceInvoice[]>([]);

const isCheckAll = computed(() => !!driverInvoices.value.length && selectedInvoiceMap.size === driverInvoices.value.length);
const isSelectHalf = computed(() => !!selectedInvoiceMap.size && (selectedInvoiceMap.size < driverInvoices.value.length));
const totalSelectedInvoicesAmount = computed(() => {
  const invoices = Array.from(selectedInvoiceMap.values());
  if (invoices.length === 0) {
    return 0;
  }
  let result = 0;
  invoices.forEach(i => result += invoiceNetTake(i));
  return result;
});

const onCheckAll = (isChecked: boolean) => {
  if (!isChecked) {
    selectedInvoiceMap.clear();
    return;
  }
  driverInvoices.value.forEach(i => selectedInvoiceMap.set(i.id, i));
};

const onSelectInvoice = (item: API.SourceInvoice) => {
  if (selectedInvoiceMap.has(item.id)) {
    selectedInvoiceMap.delete(item.id);
    return;
  }
  selectedInvoiceMap.set(item.id, item);
};

const composeDriverInvoice = async () => {
  const rs = await getDriverInvoices({
    driverId: driverId.value,
    invoiceType: 'unpaid',
    items: 100,
  });
  driverInvoices.value = rs.sourceInvoices;
  rs.sourceInvoices.forEach(i => selectedInvoiceMap.set(i.id, i));
};

const init = async () => {
  composeDriverInvoice();
};
init();
</script>
