<template>
  <main>
    <CommonPageTitle
      title="Quản lý lịch sử thanh toán"
      actionBtnLabel="Tạo mới"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="transaction_history_code_cont"
      @search="onSearch"
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
            <AButton type="link" class="p0">
              {{ record?.transaction_history_code || '_' }}
            </AButton>
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
            <DynamicTag :status="record?.status ?? ''" />
          </template>
        </ATableColumn>
      </ATable>
    </section>
    <GroupDriverDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :groupId="detailsDrawerState.id"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { searchFilterRaw } from './column';
import { type QueriesRaw } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { vndFormat } from '@/utils/number.util';
import { formatDate } from '@/utils/date.util';
import { useTableMethod } from '@/composable/useTableMethod';

const DriverInfo = defineAsyncComponent(() => import('@/components/common/DriverInfo.vue'));
const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  id: '',
});

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

const onCloseDetailDrawer = (needFetch: boolean) => {
  detailsDrawerState.id = '';
  detailsDrawerState.title = '';
  detailsDrawerState.isOpen = false;
  needFetch && reload();
};

const onSearch = (e: QueriesRaw<API.TransactionHistory>[]) => {
  rawQueries.value = e;
  search();
};
const showDriverInfo = (driverId: string) => {
  const modalId = coreModal.show({
    component: DriverInfo,
    modalWidth: '60rem',
    props: {
      driverId,
    },
    emits: {
      close: () => coreModal.close(modalId),
    },
  });
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const openModel = (userId?: string) => {
  const title = userId ? 'Cập nhật thông tin nhóm tài xế' : 'Tạo mới nhóm tài xế';
  const modalId = coreModal.show({
    component: GroupDriverCreateUpdateForm,
    title,
    props: {
      groupId: userId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};
</script>
