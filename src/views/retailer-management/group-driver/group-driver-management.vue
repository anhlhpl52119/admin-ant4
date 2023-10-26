<template>
  <main>
    <CommonPageTitle
      title="Quản lý nhóm tài xế"
      actionBtnLabel="Thêm mới nhóm tài xế"
      @onClickAction="openModel()"
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
              @click="onShowDrawerDetails(record as API.GroupDriver)"
            >
              {{ record.name }}
            </AButton>
          </template>
          <template v-if="column.dataIndex === 'edit'">
            <!-- <ATooltip title="Chỉnh sửa">
              <AButton :icon="h(EditOutlined)" @click="openModel(record.id)" />
            </ATooltip>
            <AButton :icon="h(DeleteOutlined)" danger type="primary" @click="handleDelete(record.id)" /> -->
            <AButton :icon="h(EyeOutlined)" type="primary" @click="handleDelete(record.id)" />
          </template>
        </template>
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
            @reload="reload"
          />
        </template>
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
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { columns, searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';

const GroupDriverDetailDrawer = defineAsyncComponent(() => import('@/components/drawer/GroupDriverDetailDrawer.vue'));
const GroupDriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/GroupDriverCreateUpdateForm.vue'));

const { getDetails, setDetails } = useTableCache<API.GroupDriver>();

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  id: '',
});

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

const onShowDrawerDetails = async (item: API.GroupDriver) => {
  if (!item.id) {
    return;
  }
  detailsDrawerState.title = item.name;
  detailsDrawerState.isOpen = true;
  detailsDrawerState.id = item.id;
  // // check cache
  // const cacheItem = getDetails(item.id);
  // if (cacheItem) {
  //   detailsDrawerState.item = cacheItem;

  //   return;
  // }
  // // fetch
  // const res = await groupDriverApis.getDetails(item.id, { includes: ['retailer', 'drivers'] });
  // if (!(res && res.data && res.data.retailer)) {
  //   return;
  // }
  // // cache
  // setDetails(item.id, res.data);
  // detailsDrawerState.item = res.data;
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

const handleDelete = async (id: string) => {
  const doDelete = async () => {
    const rs = await groupDriverApis.delete(id);
    if (!(rs && rs.data)) {
      return;
    }
    reload();
  };

  Modal.confirm({
    title: 'Xóa nhóm tài xế',
    content: 'Bạn có muốn xóa nhóm tài xế này?',
    onOk: async () => await doDelete(),
    onCancel() {},
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
