<template>
  <main>
    <CommonPageTitle
      title="Chi nhánh"
      actionBtnLabel="Tạo Mới Chi Nhánh"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :raw="searchFilterRaw"
      :loading="isTableLoading"
      @search="onSearch"
      @reset="search"
    />
    <section class="card h-full">
      <ATable
        :data-source="recordsState"
        :columns="columns"
        :loading="isTableLoading"
        :pagination="false"
        size="small"
        :scroll="{ y: '61rem' }"
      >
        <!-- Table Title -->
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
            @reload="reload"
          />
        </template>

        <!-- Table Custom -->
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.dataIndex === 'indexNum'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'name'">
            <AButton type="link" @click="onShowDrawerDetails(record as API.Branch)">
              {{ record.name }}
            </AButton>
          </template>
          <template v-if="column.dataIndex === 'edit'">
            <ATooltip title="Chỉnh sửa">
              <AButton :icon="h(EditOutlined)" @click="openModel(record.id)" />
            </ATooltip>
          </template>
        </template>
      </ATable>
    </section>
    <BranchDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :branchItem="detailsDrawerState.item"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { columns, searchFilterRaw } from './column';
import { branchApis } from '@/apis/core/branch/branch.api';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';

// Async component
const BranchCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/BranchCreateUpdateModal.vue'));
const BranchDetailDrawer = defineAsyncComponent(() => import('@/components/drawer/BranchDetailDrawer.vue'));
const TestForm = defineAsyncComponent(() => import('@/components/form/DriverCreateUpdateForm.vue'));

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
  const a = coreModal.show({
    component: TestForm,
    title: 'Test update',
    props: {
      class: 'w-full',
    },
    emits: {},
  });
  console.log('object', a);
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

const openModel = (branchId?: string) => {
  Modal.info({
    content: h(BranchCreateUpdateModal, {
      branchId,
    }),
  });
};
</script>
