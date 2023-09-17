<template>
  <main>
    <CommonPageTitle
      title="Nhóm Tài Xế"
      action-btn-label="Thêm Nhóm Tài Xế"
      @on-click-action="openModel()"
    />
    <section class="card flex items-end justify-between" @keypress.enter="search">
      <ul class="flex gap-10 flex-wrap">
        <CInput v-model:value="queriesState!.name_cont" label="Tìm theo tên:" />
        <CInput v-model:value="queriesState!.code_cont" label="Tìm theo mã:" />
        <CInput v-model:value="queriesState!.address_cont" label="Tìm theo địa chỉ:" />
      </ul>
      <AButton
        type="primary" size="large"
        :loading="tableLoading"
        class="justify-self-end"
        @click="search"
      >
        Tìm
        <template #icon>
          <SearchOutlined />
        </template>
      </AButton>
    </section>
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
import { EditOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { columns } from './column';
import { useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { groupDriverApis } from '@/apis/core/group-driver/group-driver.api';
import { EApiId } from '@/enums/request.enum';

const GroupDriverCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/GroupDriverCreateUpdateModal.vue'));

const fetch = async (optional?: SearchGroupDriverQueryParams) => {
  const fallback = {
    records: [],
    current_page: optional?.page ?? 1,
    total_page: 10,
    total_records: 0,
  };
  const params = { ...optional };

  const res = await groupDriverApis.search(params);

  if (!(res && res.data) || res.data.group_drivers.length === 0) {
    return fallback;
  }

  return {
    records: res.data.group_drivers,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const {
  stateRecords,
  tableLoading,
  paginationState,
  queriesState,
  search,
  reload,
} = useCommonTableMethod(
  EApiId.GROUP_DRIVER_SEARCH,
  fetch,
);

const openModel = (groupDriverId?: string) => {
  Modal.info({
    content: h(GroupDriverCreateUpdateModal, {
      groupDriverId,
    }),
  });
};
</script>
