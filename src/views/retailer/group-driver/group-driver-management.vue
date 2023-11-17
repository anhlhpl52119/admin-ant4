<template>
  <main>
    <CommonPageTitle
      title="Quản lý nhóm tài xế"
      actionBtnLabel="Thêm mới nhóm tài xế"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="name_or_email_cont"
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
        <template #title>
          <CommonTableHeader
            :currentPage="tableState.currentPage"
            :pageSize="tableState.pageSize"
            :totalRecord="tableState.totalRecords"
            @pageChange="handlePageChange"
            @reload="reload"
          />
        </template>

        <ATableColumn key="name" title="Tên nhóm" :resizable="true" :ellipsis="true" :width="250" fixed="left">
          <template #default="{ record }: {record: API.GroupDriver}">
            <AButton type="link" class="p0" @click="onShowDrawerDetails(record)">
              {{ record.name }}
            </AButton>
          </template>
        </ATableColumn>

        <ATableColumn key="address" title="Địa chỉ" :ellipsis="true">
          <template #default="{ record }: {record: API.GroupDriver}">
            {{ record.address }}
          </template>
        </ATableColumn>

        <ATableColumn key="description" title="Mô tả" :ellipsis="true">
          <template #default="{ record }: {record: API.GroupDriver}">
            {{ record.description }}
          </template>
        </ATableColumn>

        <ATableColumn key="driver-cnt" title="Số lượng tài xế" align="center" :width="100" fixed="right">
          <template #default="{ record }: {record: API.GroupDriver}">
            <span class="font-600">{{ record?.drivers?.length ?? 0 }}</span>
          </template>
        </ATableColumn>

        <ATableColumn key="status" title="Status" :width="100" align="center" fixed="right">
          <template #default="{ record }: {record: API.GroupDriver}">
            <DynamicTag :status="record?.status" />
          </template>
        </ATableColumn>

        <ATableColumn key="action" title="Tạo lời mời" :width="100" align="center" fixed="right">
          <template #default="{ record }: {record: API.GroupDriver}">
            <AButton :icon="h(UserAddOutlined)" shape="round" @click="onAddDriver(record.id)" />
          </template>
        </ATableColumn>
      </ATable>
    </section>
    <GroupDriverDetailDrawer
      v-model:is-open="detailsDrawerState.isOpen"
      :groupId="detailsDrawerState.id"
      :title="detailsDrawerState.title"
      @close="onCloseDetailDrawer"
    />
  </main>
</template>

<script lang="ts" setup>
import { UserAddOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { searchFilterRaw } from './column';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';
import { EGroupDriverRelationship } from '@/enums/api.enum';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';

const DriverInviteForm = defineAsyncComponent(() => import('@/components/form/DriverInviteForm.vue'));
const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  id: '',
});

const fetch = async (params?: API.SearchGroupDriverQueryParams) => {
  const res = await groupDriverApis.search({ includes: [EGroupDriverRelationship.DRIVER], ...params });

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

const onShowDrawerDetails = async (item: API.GroupDriver) => {
  if (!item.id) {
    return;
  }
  detailsDrawerState.title = item.name;
  detailsDrawerState.isOpen = true;
  detailsDrawerState.id = item.id;
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
  EApiId.GROUP_DRIVER_SEARCH,
  fetch,
);

const onCloseDetailDrawer = (needFetch: boolean) => {
  detailsDrawerState.id = '';
  detailsDrawerState.title = '';
  detailsDrawerState.isOpen = false;
  needFetch && reload();
};

const onSearch = (e: QueriesRaw<API.GroupDriver>[]) => {
  rawQueries.value = e;
  search();
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const onAddDriver = async (groupId: string) => {
  if (!groupId) {
    message.error('Thiếu id nhóm!');

    return;
  }
  const modalId = coreModal.show({
    component: DriverInviteForm,
    title: 'Mời tài xế vào nhóm',
    props: {
      groupId,
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};

const openModel = (userId?: string) => {
  const title = userId ? 'Cập nhật thông tin nhóm tài xế' : 'Tạo mới nhóm tài xế';
  const modalId = coreModal.show({
    component: GroupDriverCreateUpdateForm,
    title,
    props: {
      groupId: userId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};
</script>
