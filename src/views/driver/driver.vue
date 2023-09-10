<template>
  <main>
    <article class="mx-16 my-20 flex-b-center">
      <span class="text-24 font-700">
        Tài Xế
      </span>
      <AButton type="primary" size="large" @click="openModel()">
        Thêm Tài Xế Mới
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
        :data-source="driversState"
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
          <div class="flex-b-center mb-16">
            <ul class="flex gap-5 font-700 items-end">
              <li><span>Tổng cộng:</span></li>
              <li><span class="text-primary text-18">{{ paginationState.totalRecord }}</span></li>
              <li><span>bản ghi được tìm thấy</span></li>
            </ul>
            <ul class="flex items-center gap-10">
              <li>
                <AButton type="primary" :icon="h(ReloadOutlined)" @click="reload">
                  Refresh
                </AButton>
              </li>
              <li>
                <APagination
                  v-model:current="paginationState.currentPage"
                  :total="paginationState.totalRecord"
                  :page-size="paginationState.viewBy"
                  size="small"
                  :show-size-changer="false"
                />
              </li>
              <li>
                <span class="mr-5">Hiển thị</span>
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
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useDriverTable } from '@/composable/table/useDriverTable';
import { VIEW_BY_OPTIONS } from '@/constants/common.constant';

const DriverCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/DriverCreateUpdateModal.vue'));

const {
  columns,
  driversState,
  tableLoading,
  paginationState,
  queriesState,
  onPageSizeChange,
  search,
  reload,
} = useDriverTable();

const openModel = (driverId?: string) => {
  Modal.info({
    content: h(DriverCreateUpdateModal, {
      driverId,
    }),
  });
};
</script>
