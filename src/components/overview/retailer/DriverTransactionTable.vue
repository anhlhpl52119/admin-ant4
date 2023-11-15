<template>
  <div>
    <ATable
      id="table-fixed-height"
      :dataSource="driverTransactions"
      bordered
      :loading="loadIdsHas(EApiId.TRANSACTION_SEARCH)"
      :pagination="false"
      class="cursor-default"
      :scroll="{ y: '30rem' }"
      size="small"
    >
      <ATableColumn key="code" title="Mã chi phiếu" :ellipsis="true" fixed="left" :width="130">
        <template #default="{ record }: {record: API.TransactionHistory}">
          <AButton type="link" class="p0" @click="showTransactionOverview(record.id)">
            {{ record?.transaction_history_code || '_' }}
          </AButton>
        </template>
      </ATableColumn>
      <ATableColumn key="create_date" title="Ngày lập" :ellipsis="true" align="center">
        <template #default="{ record }: {record: API.TransactionHistory}">
          <ul>
            <li> {{ formatDate(record?.transaction_date) || '_' }}</li>
            <li class="text-12 text-gray">
              {{ timeFromNow(record?.transaction_date) }}
            </li>
          </ul>
        </template>
      </ATableColumn>
      <ATableColumn key="amount" title="Tổng giá trị" :ellipsis="true" align="right">
        <template #default="{ record }: {record: API.TransactionHistory}">
          {{ vndFormat(record?.total_amount) || '_' }}
        </template>
      </ATableColumn>
      <ATableColumn key="status" title="Trạng thái" :width="100" align="right" fixed="right">
        <template #default="{ record }: {record: API.TransactionHistory}">
          <DynamicTag :status="record?.status" />
        </template>
      </ATableColumn>
      <template #emptyText>
        <div class="flex-center h-270">
          <i class="i-svg:empty text-20 text-desc inline-block mr-8" />
          <span>Không tìm thấy hóa đơn nào chờ thanh toán cho tài xế</span>
        </div>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
import { EApiId } from '@/enums/request.enum';
import { formatDate, timeFromNow } from '@/utils/date.util';
import { vndFormat } from '@/utils/number.util';
import { useDriverCache } from '@/composable/object-cache/useDriverCache';
import { ETransactionStatus } from '@/enums/api.enum';

const props = defineProps<{
  driverId: string
}>();

const TransactionOverview = defineAsyncComponent(() => import('@/components/overview/retailer/TransactionOverview.vue'));

const { loadIdsHas } = storeToRefs(useLoaderStore());
const { getDriverTransactions } = useDriverCache();
const { driverId } = toRefs(props);

const driverTransactions = ref<API.TransactionHistory[]>([]);

const composeDriverTransaction = async (status: `${ETransactionStatus}`) => {
  const rs = await getDriverTransactions({ driverId: driverId.value, transactionStatus: status });
  driverTransactions.value = rs.transactionHistories;
};

const showTransactionOverview = (id: string) => {
  const modalId = coreModal.show({
    component: TransactionOverview,
    props: {
      id,
    },
    modalWidth: '80rem',
    emits: {
      forceFetchList: () => {},
    },
  });
};

const init = async () => {
  composeDriverTransaction(ETransactionStatus.PENDING);
};
init();
</script>
