<template>
  <main>
    <CommonPageTitle
      title="Quản lý lịch sử thanh toán"
      actionBtnLabel="Tạo mới"
      @onClickAction="openCreateTransactionModal()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="transaction_history_code_cont"
      @search="handleSearchFormTrigger"
      @reset="resetTable"
    />
    <section class="card">
      <ATable
        :dataSource="tableRecords"
        :loading="isFetching"
        :pagination="false"
        class="cursor-default"
        :scroll="{ y: '61rem' }"
        size="small"
      >
        <template #title>
          <CommonTableHeader
            :currentPage="tableState.currentPage"
            :pageSize="tableState.pageSize"
            :totalRecord="tableState.totalRecords"
            @pageChange="handlePageChange"
            @reload="reload"
          />
        </template>

        <ATableColumn key="code" title="Mã thanh toán" :resizable="true" :ellipsis="true" :width="150" fixed="left">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <div>
              <FieldNewBadge :createTime="record?.created_at">
                <AButton type="link" class="p0" @click="showTransactionOverview(record.id)">
                  {{ record?.transaction_history_code || '_' }}
                </AButton>
              </FieldNewBadge>
            </div>
          </template>
        </ATableColumn>
        <ATableColumn key="driver" title="Tài xế thụ hưởng">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <ul>
              <li>
                <AButton type="link" class="p0" @click="showDriverInfo(record?.driver?.id ?? '')">
                  {{ record?.driver?.name || '_' }}
                </AButton>
              </li>
              <li class="text-desc">
                #{{ record?.driver?.driver_code || '_' }}
              </li>
            </ul>
          </template>
        </ATableColumn>

        <ATableColumn key="tax" title="Thuế" align="right" :width="100">
          <template #default="{ record }: {record: API.TransactionHistory}">
            {{ vndFormat(record?.tax) }}
          </template>
        </ATableColumn>

        <ATableColumn key="total_amount" title="Tổng cộng" align="right">
          <template #default="{ record }: {record: API.TransactionHistory}">
            {{ vndFormat(record?.total_amount) }}
          </template>
        </ATableColumn>

        <ATableColumn key="update_date" title="Ngày cập nhật" align="center">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <ul>
              <li>
                {{ formatDate(record?.updated_at) }}
              </li>
              <li class="text-desc">
                {{ formatDate(record?.created_at) }}
              </li>
            </ul>
          </template>
        </ATableColumn>
        <ATableColumn key="transaction_date" title="Ngày giao dịch" align="center">
          <template #default="{ record }: {record: API.TransactionHistory}">
            {{ formatDate(record?.transaction_date) }}
          </template>
        </ATableColumn>

        <ATableColumn key="status" title="Trạng thái" :width="100" align="right" fixed="right">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <DynamicTag :status="record?.status" />
          </template>
        </ATableColumn>
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { searchFilterRaw } from './column';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { vndFormat } from '@/utils/number.util';
import { formatDate } from '@/utils/date.util';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';

const DriverInfo2 = defineAsyncComponent(() => import('@/components/overview/retailer/DriverOverview.vue'));
const CreateTransaction = defineAsyncComponent(() => import('@/components/form/CreateTransaction.vue'));
const TransactionOverview = defineAsyncComponent(() => import('@/components/overview/retailer/TransactionOverview.vue'));

const fetch = async (params?: API.SearchTransactionQueryParams) => {
  const res = await transactionHistoryApis.search({ includes: ['driver'], ...params });

  if (!(res && res.data) || res.data.transaction_histories.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.transaction_histories,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const {
  handlePageChange,
  isFetching,
  tableRecords,
  tableState,
  rawQueries,
  resetTable,
  search,
  reload,
} = useTableMethod(
  EApiId.TRANSACTION_SEARCH,
  fetch,
);

const handleCreateTransactionSuccess = (modalId: string) => {
  coreModal.close(modalId);
  reload();
};

const handleSearchFormTrigger = (e: QueriesRaw<API.TransactionHistory>[]) => {
  rawQueries.value = e;
  search();
};

const showDriverInfo = (driverId: string) => {
  coreModal.show({
    component: DriverInfo2,
    showCloseBtn: true,
    modalWidth: '80rem',
    props: {
      driverId,
      showRecentInvoices: true,
      showRecentTransaction: true,
    },
  });
};

const showTransactionOverview = (id: string) => {
  const modalId = coreModal.show({
    component: TransactionOverview,
    props: {
      id,
    },
    modalWidth: '80rem',
    emits: {
      success: () => coreModal.close(modalId),
      forceFetchList: () => reload(),
    },
  });
};

const openCreateTransactionModal = () => {
  const modalId = coreModal.show({
    component: CreateTransaction,
    title: 'Tạo mới đợt thanh toán',
    modalWidth: '80rem',
    props: {
    },
    emits: {
      success: () => handleCreateTransactionSuccess(modalId),
    },
  });
};
</script>
