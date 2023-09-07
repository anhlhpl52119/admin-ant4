<template>
  <ATable :data-source="branchesState" :columns="columns">
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
import { reactive, ref } from 'vue';
import type { FilterDropdownProps } from 'ant-design-vue/es/table/interface';
import { useBranchTableData } from './useBranchTableData';

const { columns, branchesState } = useBranchTableData();
const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const searchInput = ref();
</script>
