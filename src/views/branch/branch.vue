<template>
  <article class="mx-16 my-20 flex-b-center">
    <span class="text-24 font-700">
      Chi nhánh
    </span>
    <AButton type="primary" size="large">
      Tạo Chi nhánh
      <template #icon>
        <PlusOutlined />
      </template>
    </AButton>
  </article>
  <section class="card flex items-end justify-between">
    <ul class="flex gap-5">
      <CInput v-model:value="queriesState!.name_cont" label="Tìm theo tên" />
      <CInput v-model:value="value" label="Tìm theo mã" />
      <CInput v-model:value="value" label="Tìm theo địa chỉ" />
    </ul>
    <AButton type="primary" size="large" class="justify-self-end">
      Tìm
      <template #icon>
        <SearchOutlined />
      </template>
    </AButton>
  </section>
  <section class="card">
    <ATable
      :data-source="branchesState"
      :columns="columns"
      :loading="tableLoading"
      :pagination="false"
      class="my-table"
    >
      <template #bodyCell="{ index, column }">
        <template v-if="column.dataIndex === 'indexNum'">
          {{ index + 1 }}
        </template>
      </template>
      <template #title>
        <div class="flex-b-center mb-16">
          <div class="font-700">
            Kết quả tìm kiếm
          </div>
          <ul class="flex items-center gap-10">
            <li>
              <AButton type="primary">
                Select All
              </AButton>
            </li>
            <li>
              <APagination
                v-model:current="paginationState.currentPage"
                :total="paginationState.totalRecord"
                size="small"
                :show-size-changer="false"
              />
            </li>
            <li>
              <ASelect
                v-model:value="paginationState.viewBy"
                size="small"
                :options="VIEW_BY_OPTIONS"
                @change="onPageSizeChange"
              />
            </li>
          </ul>
        </div>
      </template>
      <template #footer>
        <div>Tổng Cộng: {{ paginationState.totalRecord }}</div>
      </template>
    </ATable>
  </section>
</template>

<script lang="ts" setup>
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { useBranchTableData } from '@/composable/table/useBranchTable';
import { VIEW_BY_OPTIONS } from '@/constants/common.constant';

const {
  columns,
  branchesState,
  tableLoading,
  paginationState,
  queriesState,
  onPageSizeChange,
} = useBranchTableData();

const value = ref('');
</script>
