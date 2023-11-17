<template>
  <div class="flex-btw-center md:b-abd">
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
          :pageSize="pageSize"
          :showSizeChanger="false"
          @change="$emit('pageChange', { currentPage: $event })"
        />
      </li>
      <li>
        <span class="mr-5">Hiển thị</span>
        <ASelect
          size="small"
          :value="pageSize"
          :options="VIEW_BY_OPTIONS"
          @change="$emit('pageChange', { currentPage: 1, pageSize: $event as number })"
        />
      </li>
      <li>
        <ADropdown trigger="click">
          <template #overlay>
            <AMenu @click="$emit('onSort')">
              <AMenuItem key="create_at">
                <div class="flex gap-5 items-center">
                  <!-- <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" /> -->
                  <span>Ngày tạo</span>
                </div>
              </AMenuItem>
              <AMenuItem key="update_at">
                <div class="flex gap-5 items-center">
                  <!-- <i class="i-mdi:sort-calendar-ascending w25 h25 text-primary" /> -->
                  <span>Ngày sửa đổi</span>
                </div>
              </AMenuItem>
              <ARadioGroup v-model:value="value1" buttonStyle="solid" class="m8">
                <ARadioButton value="asc">
                  Tăng dần
                </ARadioButton>
                <ARadioButton value="desc">
                  Giảm dần
                </ARadioButton>
              </ARadioGroup>
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
  pageSize: number
}>();

defineEmits<{
  reload: [v: void]
  onSort: [v: void]
  pageChange: [v: Partial<Page>]
}>();

interface Page {
  currentPage: number
  pageSize: number
}

const value1 = ref<string>('asc');

const { currentPage, totalRecord, pageSize } = toRefs(props);
</script>
