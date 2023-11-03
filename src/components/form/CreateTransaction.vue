<template>
  <div class="">
    <CFetchOption
      v-model:initial-value="selectedId"
      :requestData="composeDriverOption"
      disabled
      labelKey="name"
    />
    <div>
      <div v-if="!selectedId" class="text-desc">
        <p>
          - Nhập tên tài xế để tìm kiếm
        </p>
        <p> - Tài xế thêm vào phải chưa nằm trong nhóm nào</p>
      </div>
      <template v-else>
        <ADivider>Thông tin tài xế</ADivider>
        <DriverInfo :driverId="selectedId" hideExtraBtn />
      </template>
    </div>
    <ADivider>Danh sách hóa đơn chưa thanh toán</ADivider>
    <div>
      <ATable
        :dataSource="invoicesList"
        bordered
        class="cursor-default"
        :scroll="{ y: '20rem' }"
        size="small"
      >
        <ATableColumn key="check" :ellipsis="true" fixed="left" :width="50" align="center">
          <template #title>
            <ATooltip :mouseEnterDelay="0.5" :title="isCheckAll ? 'Chọn tất cả hóa đơn' : 'Bỏ chọn tất cả'" color="blue-inverse">
              <ACheckbox :checked="isCheckAll" :indeterminate="isIndeterminate" @update:checked="onCheckAll($event)" />
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
        <ATableColumn key="create_date" title="Ngày tạo" :ellipsis="true" align="center">
          <template #default="{ record }: {record: API.SourceInvoice}">
            {{ formatDate(record?.invoice_date) || '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="update_date" title="Ngày chi trả" :ellipsis="true" align="center">
          <template #default="{ record }: {record: API.SourceInvoice}">
            {{ formatDate(record?.updated_at) || '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="amount" title="Tổng hóa đơn" :ellipsis="true" align="right">
          <template #default="{ record }: {record: API.SourceInvoice}">
            {{ vndFormat(record?.total_amount) || '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="roses" title="Hoa hồng" :ellipsis="true" align="right">
          <template #default="{ record }: {record: API.SourceInvoice}">
            {{ percentFormat(record?.commission_rate ?? '') }}
          </template>
        </ATableColumn>
        <ATableColumn key="netTake" title="Tổng hưởng" :ellipsis="true" align="right">
          <template #default="{ record }: {record: API.SourceInvoice}">
            {{ vndFormat(invoiceNetTake(record)) }}
          </template>
        </ATableColumn>
        <template #summary>
          <ATableSummary fixed>
            <ATableSummaryRow class="bg-#fafafa">
              <ATableSummaryCell :colSpan="2">
                <span class="text-spotlight">Tạm tính</span>
                <div class="text-desc">
                  ({{ selectedInvoiceMap.size }} hóa đơn)
                </div>
              </ATableSummaryCell>
              <ATableSummaryCell :colSpan="5" align="right">
                <span class="text-spotlight"> {{ vndFormat(total) }}</span>
              </ATableSummaryCell>
            </ATableSummaryRow>
          </ATableSummary>
        </template>
      </ATable>
    </div>
  <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';
import { formatDate } from '@/utils/date.util';
import { percentFormat, stringToNumber, vndFormat } from '@/utils/number.util';

// const props = defineProps<{
//   driverId?: string
// }>();

const emits = defineEmits<{
  cancel: [v: void]
}>();

const DriverInfo = defineAsyncComponent(() => import('@/components/common/DriverInfo.vue'));

const selectedId = ref();
const invoicesList = ref<API.SourceInvoice[]>([]);
const selectedInvoiceMap = reactive<Map<string, API.SourceInvoice>>(new Map()); // invoice_id -> invoice item

const isIndeterminate = computed(() => !!selectedInvoiceMap.size && (selectedInvoiceMap.size < invoicesList.value.length));
const isCheckAll = computed(() => !!invoicesList.value.length && selectedInvoiceMap.size === invoicesList.value.length);

const onSelectInvoice = (item: API.SourceInvoice) => {
  if (selectedInvoiceMap.has(item.id)) {
    selectedInvoiceMap.delete(item.id);
    return;
  }
  selectedInvoiceMap.set(item.id, item);
};

const onCheckAll = (isChecked: boolean) => {
  if (!isChecked) {
    selectedInvoiceMap.clear();
    return;
  }
  invoicesList.value.forEach(i => selectedInvoiceMap.set(i.id, i));
};

const invoiceNetTake = (invoice: API.SourceInvoice) => {
  const { commission_rate, total_amount, tax, discount } = invoice;
  if (!total_amount) {
    return 0;
  }
  let amount = Math.round(total_amount);
  const rate = stringToNumber(commission_rate) / 100;
  if (rate) {
    amount = Math.round(amount * rate);
  }
  if (tax) {
    // TODO: prepare for add logic later. this not available right now
  }
  if (discount) {
    // TODO: prepare for add logic later. this not available right now
  }
  return amount;
};

const total = computed(() => {
  const val = Array.from(selectedInvoiceMap.values());
  if (val.length === 0) {
    return 0;
  }
  let result = 0;
  val.forEach(i => result += invoiceNetTake(i));
  return result;
});

const composeDriverOption = async (query?: ApiQueryAttr<API.Driver>) => {
  selectedInvoiceMap.clear();
  const rs = await driverApis.search({ query });
  if (!rs || rs.data.drivers.length === 0) {
    return [];
  }

  return rs.data.drivers;
};

const fetchDriverInvoice = async (driverId: string) => {
  invoicesList.value = [];

  const rs = await invoiceApis.search({
    items: 50,
    query: {
      status_eq: 'active',
      driver_id_eq: driverId,
      transaction_history_id_null: 'true',
    },
  });
  if (!(rs && rs.data && !!rs.data.source_invoices.length)) {
    return;
  }
  invoicesList.value = rs.data.source_invoices;
};

watchEffect(() => {
  if (!selectedId.value) { return; };
  fetchDriverInvoice(selectedId.value);
});

// init();
</script>
