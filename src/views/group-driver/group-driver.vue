<template>
  <main>
    <CommonPageTitle
      title="Nhóm Tài Xế"
      action-btn-label="Thêm Nhóm Tài Xế"
      @on-click-action="openModel()"
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
        class="core-table"
      >
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
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :total-record="totalRecords"
            @reload="reload"
          />
        </template>
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { columns, searchFilterRaw } from './column';
import { useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { groupDriverApis } from '@/apis/core/group-driver/group-driver.api';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';

const GroupDriverCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/GroupDriverCreateUpdateModal.vue'));

const fetch = async (params?: API.SearchGroupDriverQueryParams) => {
  const res = await groupDriverApis.search(params);

  if (!(res && res.data) || res.data.group_drivers.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.group_drivers,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
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
  EApiId.GROUP_DRIVER_SEARCH,
  fetch,
);

// TODO: refactor any type
const onSearch = (e: any) => {
  rawQueries.value = e;
  search();
};

const openModel = (groupDriverId?: string) => {
  Modal.info({
    content: h(GroupDriverCreateUpdateModal, {
      groupDriverId,
    }),
  });
};
</script>
