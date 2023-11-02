<template>
  <ATable
    :data-source="branchesState"
    :columns="columns"
    :loading="tableLoading"
    size="small"
    :pagination="false"
    :scroll="{ y: '61rem' }"
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
      <!-- <div class="flex-b-center mb-16">
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
      </div> -->
      <CommonTableHeader
        :currentPage="paginationState.currentPage"
        :viewBy="paginationState.viewBy"
        :totalRecord="paginationState.totalRecord"
        @changePageSize="onPageSizeChange"
        @reload="reload"
      />
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useBranchTable } from '@/composable/table/useBranchTable';

const BranchCreateUpdateModal = defineAsyncComponent(() => import('@/components/modal/BranchCreateUpdateModal.vue'));

const {
  columns,
  branchesState,
  tableLoading,
  paginationState,
  onPageSizeChange,
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
