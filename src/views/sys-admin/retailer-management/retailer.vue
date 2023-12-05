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
        :pagination="false"
        class="cursor-default"
      >
        <ATableColumn key="name" title="Tên nhà bán lẻ" :ellipsis="true" :width="300" fixed="left">
          <template #default="{ record }: {record: API.Retailer}">
            <AButton type="link" class="p0" @click="goToDetails(record.id)">
              {{ record.name }}
            </AButton>
          </template>
        </ATableColumn>

        <ATableColumn key="code" title="Mã" :ellipsis="true" :width="140">
          <template #default="{ record }: {record: API.Retailer}">
            <div @click="copyText(record?.retailer_code ?? '_')">
              <span class="clickable">{{ record.retailer_code }}</span>
            </div>
          </template>
        </ATableColumn>
        <ATableColumn key="phone" title="Số điện thoại" width="15rem" align="center">
          <template #default="{ record }: {record: API.Retailer}">
            <div
              class="flex-center gap-5 clickable"
              @click="copyText(record?.phone ?? '_')"
            >
              <span>{{ record?.phone ?? '_' }}</span>
              <i class="i-solar:copy-outline inline-block text-primary" />
            </div>
          </template>
        </ATableColumn>
        <ATableColumn key="mail" :ellipsis="true" width="20rem">
          <template #title>
            <div class=" flex gap-5 items-center">
              <i class="i-material-symbols:alternate-email-rounded block text-22 text-primary" />
              <span>Email</span>
            </div>
          </template>
          <template #default="{ record }: {record: API.Retailer}">
            <span>{{ record?.email ?? '_' }}</span>
          </template>
        </ATableColumn>
        <ATableColumn key="address" title="Địa chỉ" :ellipsis="true">
          <template #default="{ record }: {record: API.Retailer}">
            {{ record?.address ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="config" title="Cấu hình" width="20rem" align="center" fixed="right">
          <template #default="{ record }: {record: API.Retailer}">
            <FieldDynamicTag :status="record?.sync_status ?? ''" />
          </template>
        </ATableColumn>
        <ATableColumn key="status" title="Trạng thái" width="17rem" align="center" fixed="right">
          <template #default="{ record }: {record: API.Retailer}">
            <FieldDynamicTag :status="record?.status" />
          </template>
        </ATableColumn>
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { columns, searchFilterRaw } from './column';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';
import { ERouteName } from '@/enums/router.enum';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';
import { copyText } from '@/utils/common.util';

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
  router.push({ name: ERouteName.RETAILER_DETAILS, params: { id } });
};

const openModel = (retailerId?: string) => {
  const title = retailerId ? 'Cập nhật thông tin nhà bán lẻ' : 'Tạo mới nhà bán lẻ';
  const modalId = coreModal.show({
    component: RetailerCreateUpdateForm,
    modalWidth: '50rem',
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
