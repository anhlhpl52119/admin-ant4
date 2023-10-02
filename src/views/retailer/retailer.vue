<template>
  <main>
    <CommonPageTitle
      title="Nhà Bán lẻ"
      action-btn-label="Thêm Nhà Bán Lẻ"
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
        size="small"
      >
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.dataIndex === 'indexNum'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'name'">
            <AButton
              type="link"
              @click="$router.push({ name: ERouteName.RETAILER_DETAILS_OVERVIEW, params: { id: record.id } })"
            >
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
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { ERouteName } from '@/enums/router.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';

const RetailerCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/RetailerCreateUpdateModal.vue'));

const fetch = async (params?: API.SearchRetailerQueryParams) => {
  const res = await retailerApis.search(params);

  if (!(res && res.data) || res.data.retailers.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.retailers,
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
  EApiId.RETAILER_SEARCH,
  fetch,
);

// TODO: refactor any type
const onSearch = (e: QueriesRaw<API.Retailer>[]) => {
  rawQueries.value = e;
  search();
};
const openModel = (retailerId?: string) => {
  Modal.info({
    content: h(RetailerCreateUpdateModal, {
      retailerId,
    }),
  });
};
</script>
