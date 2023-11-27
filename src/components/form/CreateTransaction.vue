<template>
  <div>
    <CFetchOption
      v-model:initial-value="selectedDriverId"
      :requestData="composeDriverOption"
      disabled
      labelKey="name"
      class="w-400"
    />
    <div v-if="!selectedDriverId" class="text-desc">
      <p>
        - Nhập tên tài xế để lọc ra những hóa đơn chưa thanh toán
      </p>
    </div>
    <div v-if="selectedDriverId" class="w-800">
      <div>
        <ADivider>Thông tin tài xế</ADivider>
        <DriverInfo :driverId="selectedDriverId" hideExtraBtn />
      </div>
      <ADivider>Danh sách hóa đơn chưa thanh toán</ADivider>
      <div class="my-16 card">
        <ARangePicker :presets="rangePresets" :format="EDateFormat.DATE_API_QUERY" @change="onRangeChange" />
        <div>
          <span class="mr-5">Thanh toán ngay</span>
          <ATooltip
            :title="selectedInvoiceMap.size === 0 ? null : 'Hóa đơn này sẽ được đánh dấu là [Hoàn tất] ngay lập tức sau khi tạo'"
            arrowPointAtCenter
          >
            <ASwitch
              :checked="markAsDoneAfterCreate"
              :disabled="selectedInvoiceMap.size === 0"
              @update:checked="markAsDoneDirectly($event as boolean)"
            />
          </ATooltip>
        </div>
      </div>
      <div>
        <ATable
          id="table-fixed-height"
          :dataSource="invoiceState.records"
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
                  :indeterminate="isSoftSelect"
                  :disabled="invoiceState.totalItem === 0"
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
                  <ul class="h-40">
                    <li class="text-spotlight">
                      Tạm tính
                    </li>
                    <li v-if="!!selectedInvoiceMap.size" class="text-gray">
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
    </div>
    <div class="mt-16 flex flex-row-reverse">
      <ATooltip :mouseEnterDelay="0.5" :title="!!selectedInvoiceMap.size ? null : 'Chọn ít nhất 1 hóa đơn'" color="blue-inverse">
        <AButton :disabled="selectedInvoiceMap.size === 0" :loading="loadIdsHas(EApiId.TRANSACTION_CREATE)" type="primary" @click="onCreate">
          {{ markAsDoneAfterCreate ? 'Thanh toán cho các hóa đơn này' : 'Tạo mới' }}
        </AButton>
      </ATooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { ETransactionStatus } from '@/enums/api.enum';
import { EApiId } from '@/enums/request.enum';
import { formatDate } from '@/utils/date.util';
import { percentFormat, vndFormat } from '@/utils/number.util';
import { invoiceNetTake } from '@/composable/useCommonComposable';
import { EDateFormat } from '@/enums/common.enum';

type RangeValue = [Dayjs, Dayjs] | [string, string];

const props = defineProps<{
  driverId?: string
}>();

const emits = defineEmits<{
  cancel: [v: void]
  success: [v?: any]
}>();

const DriverInfo = defineAsyncComponent(() => import('@/components/common/DriverInfo.vue'));

const { loadIdsHas } = storeToRefs(useLoaderStore());

const selectedDriverId = ref();
const markAsDoneAfterCreate = ref(false);

const selectedInvoiceMap = reactive<Map<string, API.SourceInvoice>>(new Map()); // invoice_id -> invoice item
const invoiceState = reactive({
  records: [] as API.SourceInvoice[],
  totalItem: 0,
});

const isSoftSelect = computed(() => !!selectedInvoiceMap.size && (selectedInvoiceMap.size < invoiceState.records.length));
const isCheckAll = computed(() => !!invoiceState.records.length && selectedInvoiceMap.size === invoiceState.records.length);

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
  invoiceState.records.forEach(i => selectedInvoiceMap.set(i.id, i));
};

const markAsDoneDirectly = async (isCheck: boolean) => {
  if (!isCheck) {
    markAsDoneAfterCreate.value = false;
    return;
  }
  const confirm = await showAsyncAlert({
    content: 'Bạn có muốn xác nhận thanh toán ngay lập tức cho hóa đơn này sau khi tạo?',
  });

  if (!confirm) { return; }

  markAsDoneAfterCreate.value = true;
};

const totalSelectedInvoicesAmount = computed(() => {
  const invoices = Array.from(selectedInvoiceMap.values());
  if (invoices.length === 0) {
    return 0;
  }
  let result = 0;
  invoices.forEach(i => result += invoiceNetTake(i));
  return result;
});

const composeDriverOption = async (query?: ApiQueryAttr<API.Driver>) => {
  selectedInvoiceMap.clear();
  const rs = await retailerDriverApis.searchMyDrivers({ query });
  if (!rs || rs.data.drivers.length === 0) {
    return [];
  }

  return rs.data.drivers;
};

const fetchDriverInvoices = async (driverId: string, rangeDate: Record<string, string> = {}) => {
  invoiceState.records = [];
  invoiceState.totalItem = 0;
  selectedInvoiceMap.clear();

  const rs = await invoiceApis.search({
    items: 50,
    query: {
      status_eq: 'active',
      driver_id_eq: driverId,
      transaction_history_id_null: 'true',
      s: 'invoice_date desc',
      ...rangeDate,
    },
  });
  if (!(rs && rs.data && !!rs.data.source_invoices.length)) {
    return;
  }
  invoiceState.records = rs.data.source_invoices;
  invoiceState.totalItem = rs?.data?.total_records ?? 0;
};

const rangePresets = ref([
  { label: '7 ngày gần nhất', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '2 tuần gần nhất', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '1 tháng gần nhất', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '3 tháng gần nhất', value: [dayjs().add(-90, 'd'), dayjs()] },
]);

const onRangeChange = (dates: RangeValue, dateStrings: [string, string]) => {
  if (dates) {
    if (!selectedDriverId.value) {
      return;
    }
    fetchDriverInvoices(selectedDriverId.value, {
      invoice_date_gteq: dateStrings[0],
      invoice_date_lteq: dateStrings[1],
    });
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  else {
    console.log('Clear');
  }
};

const onCreate = async () => {
  if (!selectedDriverId.value) {
    await showAsyncAlert({ content: 'Cần phải chỉ định tài xế cụ thể cho đợt thanh toán' });
    return;
  }
  if (selectedInvoiceMap.size === 0) {
    showAsyncAlert({ content: 'Cần phải chọn ít nhất 1 hóa đơn cho đợt thanh toán' });
    return;
  }
  const invoiceIds = Array.from(selectedInvoiceMap.keys());

  // call api create
  const preCreateStatus = markAsDoneAfterCreate.value ? ETransactionStatus.DONE : ETransactionStatus.PENDING;
  const createBody: API.CreateTransactionHistoryRequestBody = {
    transaction_history: {
      tax: 0,
      driver_id: selectedDriverId.value,
      status: preCreateStatus,
      description: '',
    },
    source_invoice_ids: invoiceIds,
  };

  const rs = await transactionHistoryApis.create(createBody);
  if (!(rs && rs.data)) {
    return;
  }
  emits('success');
};

watchEffect(() => {
  if (!selectedDriverId.value) { return; };
  fetchDriverInvoices(selectedDriverId.value);
});
</script>
