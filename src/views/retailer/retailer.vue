<template>
  <main>
    <CommonPageTitle
      title="Nhà Bán lẻ"
      actionBtnLabel="Thêm Nhà Bán Lẻ"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="name_cont"
      @search="onSearch"
      @reset="resetTable"
    />
    <section class="card">
      <ATable
        :dataSource="tableRecords"
        :loading="isFetching"
        :columns="columns"
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
            <ATooltip title="Chi tiết">
              <AButton :icon="h(InfoCircleOutlined)" @click="goToDetails(record.id)" />
            </ATooltip>
          </template>
          <template v-if="column.dataIndex === 'sync_status'">
            <DynamicTag :status="record?.sync_status ?? ''" />
          </template>
        </template>
        <template #title>
          <CommonTableHeader
            :currentPage="tableState.currentPage"
            :pageSize="tableState.pageSize"
            :totalRecord="tableState.totalRecords"
            @pageChange="handlePageChange"
            @reload="reload"
          />
        </template>
      </ATable>
    </section>
    <RetailerDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :retailerItem="detailsDrawerState.item"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { columns, searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';
import type { ERetailerSyncStatus } from '@/enums/api.enum';
import { ERouteName } from '@/enums/router.enum';
import { useTableMethod } from '@/composable/useTableMethod';

const RetailerDetailDrawer = defineAsyncComponent(() => import('@/components/drawer/RetailerDetailDrawer.vue'));
const RetailerCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.Retailer>();
const router = useRouter();

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
  handlePageChange,
  isFetching,
  tableRecords,
  tableState,
  rawQueries,
  resetTable,
  search,
  reload,
} = useTableMethod(
  EApiId.RETAILER_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Retailer>[]) => {
  rawQueries.value = e;
  search();
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const goToDetails = async (id: string) => {
  if (!id) {
    message.error('Thiếu Retailer ID');

    return;
  }
  await router.push({ name: ERouteName.RETAILER_DETAILS, params: { id } });
};

const openModel = (retailerId?: string) => {
  const title = retailerId ? 'Cập nhật thông tin nhà bán lẻ' : 'Tạo mới nhà bán lẻ';
  const modalId = coreModal.show({
    component: RetailerCreateUpdateForm,
    title,
    props: {
      retailerId: retailerId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};
</script>
