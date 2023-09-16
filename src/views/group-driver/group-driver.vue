<template>
  <main>
    <article class="mx-16 my-20 flex-b-center">
      <span class="text-24 font-700">
        Nhóm Tài Xế
      </span>
      <AButton type="primary" size="large" @click="openModel()">
        Thêm Nhóm Tài Xế
        <template #icon>
          <PlusOutlined />
        </template>
      </AButton>
    </article>
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
        :data-source="groupDriverState"
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
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useGroupDriverTable } from '@/composable/table/useGroupDriverTable';

const GroupDriverCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/GroupDriverCreateUpdateModal.vue'));

const {
  columns,
  groupDriverState,
  tableLoading,
  paginationState,
  queriesState,
  search,
  reload,
} = useGroupDriverTable();

const openModel = (groupDriverId?: string) => {
  Modal.info({
    content: h(GroupDriverCreateUpdateModal, {
      groupDriverId,
    }),
  });
};
</script>
