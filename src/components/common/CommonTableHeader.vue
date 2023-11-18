<template>
  <div class="flex items-center">
    <div class="text-nowrap text-spotlight">
      <strong class="text-info">{{ totalRecord }}</strong>
      <span class="ml-4">Bản ghi</span>
    </div>

    <AButton
      type="default"
      shape="round"
      size="small"
      class="ml-4 justify-self-center"
      :icon="h(ReloadOutlined)" @click="$emit('reload')"
    />

    <div class="flex ml-auto">
      <APagination
        size="small"
        :current="currentPage"
        :total="totalRecord"
        :pageSize="pageSize"
        :showSizeChanger="false"
        @change="$emit('pageChange', { currentPage: $event })"
      />
      <ASelect
        size="small"
        :value="pageSize"
        :options="VIEW_BY_OPTIONS"
        class="hidden md:block"
        @change="$emit('pageChange', { currentPage: 1, pageSize: $event as number })"
      />
    </div>

    <!-- <ul class="flex items-center gap-5">
      <li>
        <AButton type="primary" shape="round" size="small" :icon="h(ReloadOutlined)" @click="$emit('reload')">
          Làm mới
        </AButton>
      </li>
      <li class="whitespace-nowrap">
        <APagination
          size="small"
          :current="currentPage"
          :total="totalRecord"
          :pageSize="pageSize"
          :showSizeChanger="false"
          @change="$emit('pageChange', { currentPage: $event })"
        />
      </li>
      <li class="hidden md:block">
        <ASelect
          size="small"
          :value="pageSize"
          :options="VIEW_BY_OPTIONS"
          @change="$emit('pageChange', { currentPage: 1, pageSize: $event as number })"
        />
      </li> -->

    <!-- <li>
        <ADropdown trigger="click">
          <template #overlay>
            <AMenu @click="$emit('onSort')">
              <AMenuItem key="create_at">
                <div class="flex gap-5 items-center">
                  <span>Ngày tạo</span>
                </div>
              </AMenuItem>
              <AMenuItem key="update_at">
                <div class="flex gap-5 items-center">
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
      </li> -->
    <!-- </ul> -->
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
