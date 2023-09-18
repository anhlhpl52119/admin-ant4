<template>
  <main>
    <CommonPageTitle
      title="Chi nhánh"
      action-btn-label="Tạo Mới Chi Nhánh"
      @on-click-action="openModel()"
    />

    <CommonTableSearchForm
      :loading="tableLoading"
      @search="search"
      @reset="search"
    />

    <section class="card h-full">
      <ATable
        :data-source="stateRecords"
        :columns="columns"
        :loading="tableLoading"
        :pagination="false"
        :scroll="{ y: '61rem' }"
        class="my-table"
      >
        <!-- Table Title -->
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:view-by="paginationState.viewBy"
            :total-record="paginationState.totalRecord"
            @reload="reload"
          />
        </template>

        <!-- Table Custom -->
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.dataIndex === 'indexNum'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'name'">
            <AButton type="link">
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
  </main>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { columns } from './column';
import { branchApis } from '@/apis/core/branch/branch.api';
import { useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';

const BranchCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/BranchCreateUpdateModal.vue'));

const fetch = async (optional?: SearchBranchQueryParams) => {
  const fallback = {
    records: [],
    current_page: optional?.page ?? 1,
    total_page: 10,
    total_records: 0,
  };
  const params = { ...optional };

  const res = await branchApis.search(params);

  if (!(res && res.data) || res.data.branches.length === 0) {
    return fallback;
  }

  return {
    records: res.data.branches,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const {
  stateRecords, tableLoading, paginationState,
  search,
  reload,
} = useCommonTableMethod(
  EApiId.BRANCH_SEARCH,
  fetch,
);

const openModel = (branchId?: string) => {
  Modal.info({
    content: h(BranchCreateUpdateModal, {
      branchId,
    }),
  });
};
</script>
