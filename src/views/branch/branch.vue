<template>
  <main>
    <article class="mx-16 my-20 flex-b-center">
      <span class="text-24 font-700">
        Chi nhánh
      </span>
      <AButton type="primary" size="large" @click="openModel()">
        Tạo Chi nhánh
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
      <ul class="justify-self-end flex gap-5 items-center">
        <li>
          <AButton
            size="small"
            shape="round"
            danger
            :loading="tableLoading"
            class="group"
            @click="reload"
          >
            <span>Xóa bộ lọc</span>
            <template #icon>
              <ClearOutlined />
            </template>
          </AButton>
        </li>
        <li>
          <AButton
            type="primary" size="large"
            :loading="tableLoading"
            @click="search"
          >
            Tìm
            <template #icon>
              <SearchOutlined />
            </template>
          </AButton>
        </li>
      </ul>
    </section>
    <section class="card h-full">
      <ATable
        :data-source="branchesState"
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
import { ClearOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useBranchTable } from '@/composable/table/useBranchTable';

const BranchCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/BranchCreateUpdateModal.vue'));

const {
  columns,
  branchesState,
  tableLoading,
  paginationState,
  queriesState,
  search,
  reload,
} = useBranchTable();

const openModel = (branchId?: string) => {
  Modal.info({
    content: h(BranchCreateUpdateModal, {
      branchId,
    }),
  });
};
</script>
