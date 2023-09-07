<template>
  <div class="p-10">
    <AInput
      ref="searchInput"
      :placeholder="`Search ${column.dataIndex}`"
      :value="selectedKeys[0]"
      class="w-200 mb-10 block"
      @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
      @press-enter="handleSearch(selectedKeys, column.dataIndex)"
    />
    <AButton
      type="primary"
      size="small"
      class="w-90 mr-10"
      @click="handleSearch(selectedKeys, column.dataIndex)"
    >
      <template #icon>
        <SearchOutlined />
      </template>
      Search
    </AButton>
    <AButton size="small" class="w-90" @click="handleReset(clearFilters)">
      Reset
    </AButton>
  </div>
</template>

<script lang="ts" setup generic="T">
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface';
import { SearchOutlined } from '@ant-design/icons-vue';

const props = defineProps<FilterDropdownProps<T>>();
const emits = defineEmits<{
  search: [v: (s: string) => void]
}>();
const searchInput = ref();
const handleSearch = (selectedKeys: Array<string | number>, dataIndex: any) => {};

const handleReset = (clearFilters: any) => {
  clearFilters({ confirm: true });
};
</script>
