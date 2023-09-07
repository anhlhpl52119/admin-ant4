<template>
  <ATable :data-source="driverState" :columns="columns" :loading="isFetching">
    <template
      #customFilterDropdown="{
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        column,
      }: Partial<FilterDropdownProps<Branch>>"
    >
      <CTableFilterDropdown
        :selected-keys="selectedKeys!"
        :set-selected-keys="setSelectedKeys!"
        :confirm="confirm!"
        :clear-filters="clearFilters"
        :column="column!"
      />
    </template>
  </ATable>
</template>

<script lang="ts" setup>
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface';
import { useDriverTableData } from './useDriverTableData';

const { columns, driverState, isFetching } = useDriverTableData();
watch(driverState, (v) => {
  console.log('object', v);
});
const searchInput = ref();
</script>
