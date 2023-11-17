<template>
  <main>
    <CommonPageTitle
      title="Quản lý người dùng"
      actionBtnLabel="Thêm người dùng"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="name_or_phone_cont"
      @search="onSearch"
      @reset="resetTable"
    />
    <section class="card">
      <ATable
        :dataSource="tableRecords"
        :loading="isFetching"
        :pagination="false"
        size="small"
      >
        <ATableColumn key="index" title="Stt" width="5rem" align="center">
          <template #default="{ index }">
            {{ index + 1 }}
          </template>
        </ATableColumn>
        <ATableColumn key="name" title="Tên">
          <template #default="{ record }: {record: API.RetailerUser}">
            <AButton type="link" @click="onShowDrawerDetails(record)">
              {{ record?.name ?? '_' }}
            </AButton>
          </template>
        </ATableColumn>
        <ATableColumn key="phone" title="Số điện thoại">
          <template #default="{ record }: {record: API.RetailerUser}">
            {{ record?.phone ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="email" title="Email">
          <template #default="{ record }: {record: API.RetailerUser}">
            {{ record?.email ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="role" title="Phân quyền" width="20rem" align="center">
          <template #default="{ record }: {record: API.RetailerUser}">
            <DynamicTag :status="record?.role" />
          </template>
        </ATableColumn>
        <ATableColumn key="last-update" title="Cập nhật" width="10rem" align="right">
          <template #default="{ record }: {record: API.Driver}">
            <span class="text-desc">{{ formatDate(record.updated_at) }}</span>
          </template>
        </ATableColumn>

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
    <UserDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :userId="detailsDrawerState.id"
      :title="detailsDrawerState.title"
      :item="detailsDrawerState.item"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { searchFilterRaw } from './column';
import { formatDate } from '@/utils/date.util';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { retailerUserApis } from '@/apis/retailer/user-mgt/user-mgt.api';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';

const RetailerUserCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/RetailerUserCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.RetailerUser>();

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  item: undefined as API.RetailerUser | undefined,
  id: '',
});

const fetch = async (params?: API.SearchRetailerUserQueryParams) => {
  const res = await retailerUserApis.search(params);

  if (!(res && res.data) || res.data.users.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.users,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const onShowDrawerDetails = async (item: API.RetailerUser) => {
  if (!item.id) {
    return;
  }
  detailsDrawerState.title = item.name;
  detailsDrawerState.isOpen = true;
  detailsDrawerState.id = item.id;
  // check cache
  const cacheItem = getDetails(item.id);
  if (cacheItem) {
    detailsDrawerState.item = cacheItem;

    return;
  }
  // fetch
  const res = await retailerUserApis.getDetails(item.id, { includes: ['belonged_retailer'] });
  if (!(res && res.data && res.data.belonged_retailer)) {
    return;
  }
  // cache
  setDetails(item.id, res.data);
  detailsDrawerState.item = res.data;
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
  EApiId.RETAILER_USER_SEARCH,
  fetch,
);

const onCloseDetailDrawer = (needFetch: boolean) => {
  detailsDrawerState.item = undefined;
  detailsDrawerState.title = '';
  detailsDrawerState.isOpen = false;
  detailsDrawerState.id = '';
  if (needFetch) {
    reload();
  }
};

const onSearch = (e: QueriesRaw<API.RetailerUser>[]) => {
  rawQueries.value = e;
  search();
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  reload();
};

const onDelete = async (id: string) => {
  if (!id) {
    Modal.error({ content: 'thiếu id' });

    return;
  }
  const confirm = await showAsyncAlert({
    content: 'bạn có chắc muốn xóa',
  });

  if (!confirm) {
    return;
  }
  const rs = await retailerUserApis.delete(id);
  if (rs && rs.data) {
    Modal.success({ content: 'Thành công!' });
    reload();
  }
};

const openModel = (userId?: string) => {
  const title = userId ? 'Cập nhật thông nhân viên' : 'Tạo mới nhân viên';
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
