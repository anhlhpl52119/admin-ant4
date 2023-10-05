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
              @click="onShowDrawerDetails(record as API.Retailer)"
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
    <RetailerDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :retailer-item="detailsDrawerState.item"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { columns, searchFilterRaw } from './column';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { closeModal, showModal } from '@/composable/useAppModal';

const RetailerDetailDrawer = defineAsyncComponent(() => import('@/components/drawer/RetailerDetailDrawer.vue'));
const RetailerCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.Retailer>();

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  item: null as API.Retailer | null,
});

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

const onShowDrawerDetails = async (item: API.Retailer) => {
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
  const res = await retailerApis.getDetails(item.id, { includes: ['drivers', 'group_drivers'] });
  if (!(res && res.data.drivers && res.data.group_drivers)) {
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
  EApiId.RETAILER_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Retailer>[]) => {
  rawQueries.value = e;
  search();
};

const handleOk = (v: string) => {
  closeModal();
};

const openModel = (retailerId?: string) => {
  const title = retailerId ? 'Cập nhật thông tin nhà bán lẻ' : 'Tạo mới nhà bán lẻ';
  showModal({
    component: RetailerCreateUpdateForm,
    modalTitle: title,
    props: {
      retailerId: retailerId ?? '',
      class: 'w-700',
    },
    emits: {
      cli: (v: string) => handleOk(v),
    },
  });
};
</script>
