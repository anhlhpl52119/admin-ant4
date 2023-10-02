<template>
  <div class="flex-b-center">
    <ul class="flex gap-5 font-700 items-center">
      <li><span>Tổng cộng:</span></li>
      <li><span class="text-primary text-18">{{ totalRecord }}</span></li>
      <li><span>bản ghi được tìm thấy</span></li>
    </ul>
    <ul class="flex items-center gap-10">
      <li>
        <AButton type="primary" :icon="h(ReloadOutlined)" @click="$emit('reload')">
          Làm mới
        </AButton>
      </li>
      <li>
        <APagination
          size="small"
          :current="currentPage"
          :total="totalRecord"
          :page-size="recordPerPage"
          :show-size-changer="false"
          @change="$emit('update:currentPage', $event)"
        />
      </li>
      <li>
        <span class="mr-5">Hiển thị</span>
        <ASelect
          size="small"
          :value="recordPerPage"
          :options="VIEW_BY_OPTIONS"
          @change="onChangePageSize($event as number)"
        />
      </li>
      <li>
        <ADropdown trigger="click">
          <template #overlay>
            <AMenu @click="$emit('onSort')">
              <AMenuItem key="1">
                <div class="flex gap-5 items-center">
                  <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" />
                  <span>Ngày tạo gần nhất</span>
                </div>
              </AMenuItem>
              <AMenuItem key="2">
                <div class="flex gap-5 items-center">
                  <i class="i-mdi:sort-calendar-descending w25 h25 text-red" />
                  <span>Ngày tạo</span>
                </div>
              </AMenuItem>
              <AMenuItem key="3">
                <div class="flex gap-5 items-center">
                  <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" />
                  <span>Ngày sửa đổi</span>
                </div>
              </AMenuItem>
            </AMenu>
          </template>
          <AButton size="small">
            Ngày tạo gần nhất
          </AButton>
        </ADropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ReloadOutlined } from '@ant-design/icons-vue';
import { VIEW_BY_OPTIONS } from '@/constants/common.constant';

const props = defineProps<{
  totalRecord: number
  currentPage: number
  recordPerPage: number
}>();
const emits = defineEmits<{
  'update:currentPage': [v: number]
  'update:recordPerPage': [v: number]
  reload: [v: void]
  onSort: [v: void]
}>();

const { currentPage, totalRecord, recordPerPage } = toRefs(props);

const onChangePageSize = (size: number) => {
  emits('update:currentPage', 1);
  emits('update:recordPerPage', size);
};
</script>
