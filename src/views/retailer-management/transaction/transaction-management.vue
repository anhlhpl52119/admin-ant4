<template>
  <main>
    <CommonPageTitle
      title="Quản lý lịch sử thanh toán"
      actionBtnLabel="Tạo mới"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :raw="searchFilterRaw"
      :loading="isTableLoading"
      @search="onSearch"
      @reset="search"
    />
    <section class="card">
      <ATable
        :data-source="recordsState"
        :loading="isTableLoading"
        :pagination="false"
        class="cursor-default"
        :scroll="{ y: '61rem' }"
        size="small"
      >
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
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
              <li>{{ record?.driver?.name || '_' }}</li>
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

        <ATableColumn key="status" title="Trạng thái" :width="100" align="center" fixed="right">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <ATag :color="statusTag(record.status).color">
              <span class="ml0"> {{ statusTag(record.status).desc }} </span>
            </ATag>
          </template>
        </ATableColumn>

        <ATableColumn key="action" title="Action" :width="100" align="center" fixed="right">
          <template #default="{ record }: {record: API.TransactionHistory}">
            <AButton :icon="h(UserAddOutlined)" shape="round" @click="onAddDriver(record.id)" />
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
import { UserAddOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { vndFormat } from '@/utils/number.util';
import { formatDate } from '@/utils/date.util';
import { ETransactionStatus } from '@/enums/api.enum';

const DriverInviteForm = defineAsyncComponent(() => import('@/components/form/DriverInviteForm.vue'));
const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.TransactionHistory>();

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

const statusTag = (status: `${ETransactionStatus}`) => {
  switch (status) {
    case ETransactionStatus.CANCELLED:

      return {
        color: 'default',
        desc: 'Hủy bỏ',
      };
    case ETransactionStatus.DONE:

      return {
        color: 'success',
        desc: 'Thành công',
      };
    case ETransactionStatus.PENDING:

      return {
        color: 'purple',
        desc: 'Đang chờ',
      };

    default:
      return {
        color: 'blue',
        desc: 'unknown',
      }; ;
  }
};

// const onShowDrawerDetails = async (item: API.TransactionHistory) => {
//   if (!item.id) {
//     return;
//   }
//   detailsDrawerState.title = item.name;
//   detailsDrawerState.isOpen = true;
//   detailsDrawerState.id = item.id;
// };

const {
  isTableLoading,
  rawQueries,
  paginationState,
  recordsState,
  totalRecords,

  search,
  reload,
} = useCommonTableMethod(
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

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const onAddDriver = async (groupId: string) => {
  if (!groupId) {
    message.error('Thiếu id nhóm!');

    return;
  }
  const modalId = coreModal.show({
    component: DriverInviteForm,
    title: 'Mời tài xế vào nhóm',
    props: {
      groupId,
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
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
