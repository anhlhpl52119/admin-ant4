<template>
  <main>
    <CommonPageTitle
      title="Nhà Bán lẻ"
      action-btn-label="Thêm Nhà Bán Lẻ"
      @on-click-action="openModel()"
    />

    <CommonTableSearchForm
      :loading="tableLoading"
      @search="search"
      @reset="search"
    />

    <section class="card">
      <ATable
        :data-source="stateRecords"
        :columns="columns"
        :loading="tableLoading"
        :pagination="false"
        :scroll="{ y: '61rem' }"
        class="my-table"
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
            v-model:view-by="paginationState.viewBy"
            :total-record="paginationState.totalRecord"
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
import { columns } from './column';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';

const RetailerCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/RetailerCreateUpdateModal.vue'));

const fetch = async (optional?: SearchRetailerQueryParams) => {
  const fallback = {
    records: [],
    current_page: optional?.page ?? 1,
    total_page: 10,
    total_records: 0,
  };
  const params = { ...optional };

  const res = await retailerApis.search(params);

  if (!(res && res.data) || res.data.retailers.length === 0) {
    return fallback;
  }

  return {
    records: res.data.retailers,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const {
  stateRecords,
  tableLoading,
  paginationState,
  search,
  reload,
} = useCommonTableMethod(
  EApiId.RETAILER_SEARCH,
  fetch,
);

const openModel = (retailerId?: string) => {
  Modal.info({
    content: h(RetailerCreateUpdateModal, {
      retailerId,
    }),
  });
};
</script>
