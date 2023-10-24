<template>
  <main>
    <CommonPageTitle
      title="Quản lý chi nhánh"
      actionBtnLabel="Thêm chi nhánh"
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
        :columns="columns"
        :loading="isTableLoading"
        :pagination="false"
        :scroll="{ y: '61rem' }"
        size="small"
        @resizeColumn="handleResizeColumn"
      >
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.dataIndex === 'indexNum'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'name'">
            <AButton
              type="link"
              @click="onShowDrawerDetails(record as API.Branch)"
            >
              {{ record.name }}
            </AButton>
          </template>
        </template>
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
            @reload="reload"
          />
        </template>
      </ATable>
    </section>
    <!-- <RetailerDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :retailerItem="detailsDrawerState.item"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    /> -->
  </main>
</template>

<script lang="ts" setup>
import { columns, searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { branchApis } from '@/apis/retailer/branch-mgt/branch-mgt';

const RetailerDetailDrawer = defineAsyncComponent(() => import('@/components/drawer/RetailerDetailDrawer.vue'));
const RetailerUserCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerUserCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.Branch>();

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  item: null as API.Branch | null,
});

const fetch = async (params?: API.SearchBranchQueryParams) => {
  const res = await branchApis.search(params);

  if (!(res && res.data) || res.data.branches.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.branches,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const onShowDrawerDetails = async (item: API.Branch) => {
  if (!item.id) {
    return;
  }
  detailsDrawerState.title = item.name;
  detailsDrawerState.isOpen = true;
  // check cache
  const cacheItem = getDetails(item.id);
  if (cacheItem) {
    detailsDrawerState.item = cacheItem;

    return;
  }
  // fetch
  const res = await branchApis.getDetails(item.id, { includes: ['retailer'] });
  if (!(res && res.data && res.data.retailer)) {
    return;
  }
  // cache
  setDetails(item.id, res.data);
  detailsDrawerState.item = res.data;
};

const onCloseDetailDrawer = () => {
  detailsDrawerState.item = null;
  detailsDrawerState.title = '';
  detailsDrawerState.isOpen = false;
};

const {
  isTableLoading,
  rawQueries,
  paginationState,
  recordsState,
  totalRecords,

  search,
  reload,
} = useCommonTableMethod(
  EApiId.BRANCH_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Branch>[]) => {
  rawQueries.value = e;
  search();
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const handleResizeColumn = (w: any, col: any) => {
  col.width = w;
};

const openModel = (userId?: string) => {
  const title = userId ? 'Cập nhật thông tin chi nhánh' : 'Tạo mới chi nhánh';
  const modalId = coreModal.show({
    component: RetailerUserCreateUpdateForm,
    title,
    props: {
      userId: userId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};
</script>
