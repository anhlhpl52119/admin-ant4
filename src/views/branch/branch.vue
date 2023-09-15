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
          <div class="flex-b-center mb-16">
            <ul class="flex gap-5 font-700 items-center">
              <li><span>Tổng cộng:</span></li>
              <li><span class="text-primary text-18">{{ paginationState.totalRecord }}</span></li>
              <li><span>bản ghi được tìm thấy</span></li>
            </ul>
            <ul class="flex items-center gap-10">
              <li>
                <AButton type="primary" :icon="h(ReloadOutlined)" @click="reload">
                  Làm mới
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
              <li>
                <ADropdown>
                  <template #overlay>
                    <AMenu @click="handleMenuClick">
                      <AMenuItem key="1">
                        <UserOutlined />
                        <div class="flex gap-5 items-center">
                          <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" />
                          <span>Ngày tạo gần nhất</span>
                        </div>
                      </AMenuItem>
                      <AMenuItem key="2">
                        <div class="flex gap-5 items-center">
                          <i class="i-mdi:sort-calendar-descending w25 h25 text-danger" />
                          <span>Ngày tạo xa nhất</span>
                        </div>
                        <UserOutlined />
                      </AMenuItem>
                      <AMenuItem key="3">
                        <div class="flex gap-5 items-center">
                          <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" />
                          <span>Ngày sửa đổi gần nhất</span>
                        </div>
                      </AMenuItem>
                    </AMenu>
                  </template>
                  <AButton size="small">
                    Ngày tạo gần nhất
                    <DownOutlined />
                  </AButton>
                </ADropdown>
              </li>
            </ul>
          </div>
        </template>
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ClearOutlined, EditOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useBranchTable } from '@/composable/table/useBranchTable';
import { VIEW_BY_OPTIONS } from '@/constants/common.constant';

const BranchCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/BranchCreateUpdateModal.vue'));

const {
  columns,
  branchesState,
  tableLoading,
  paginationState,
  queriesState,
  onPageSizeChange,
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
const handleMenuClick = () => { };
</script>
