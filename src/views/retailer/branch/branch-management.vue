<template>
  <main>
    <CommonPageTitle
      title="Quản lý chi nhánh"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="name_or_branch_code_cont"
      @search="onSearch"
      @reset="resetTable"
    />
    <section class="card">
      <ATable
        :dataSource="tableRecords"
        :columns="columns"
        :loading="isFetching"
        :pagination="false"
        size="small"
        @resizeColumn="handleResizeColumn"
      >
        <template #bodyCell="{ index, column, record }">
          <template v-if="column.dataIndex === 'indexNum'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'name'">
            <AButton
              type="link"
              @click="onShowDrawerDetails(record as API.Branch)"
            >
              {{ record.name }}
            </AButton>
          </template>
        </template>
        <template #title>
          <CommonTableHeader
            :currentPage="tableState.currentPage"
            :pageSize="tableState.pageSize"
            :totalRecord="tableState.totalRecords"
            @pageChange="handlePageChange"
            @reload="reload"
          />
        </template>
      </ATable>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { columns, searchFilterRaw } from './column';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { useTableCache } from '@/composable/useTableCache';
import { branchApis } from '@/apis/retailer/branch-mgt/branch-mgt';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';

const { getDetails, setDetails } = useTableCache<API.Branch>();

// State
const detailsDrawerState = reactive({
  isOpen: false,
  title: '',
  item: null as API.Branch | null,
});

const fetch = async (params?: API.SearchBranchQueryParams) => {
  const res = await branchApis.search(params);

  if (!(res && res.data) || res.data.branches.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.branches,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const onShowDrawerDetails = async (item: API.Branch) => {
  if (!item.id) {
    return;
  }
  detailsDrawerState.title = item.name;
  detailsDrawerState.isOpen = true;
  // check cache
  const cacheItem = getDetails(item.id);
  if (cacheItem) {
    detailsDrawerState.item = cacheItem;

    return;
  }
  // fetch
  const res = await branchApis.getDetails(item.id, { includes: ['retailer'] });
  if (!(res && res.data && res.data.retailer)) {
    return;
  }
  // cache
  setDetails(item.id, res.data);
  detailsDrawerState.item = res.data;
};

const {
  handlePageChange,
  isFetching,
  tableRecords,
  tableState,
  rawQueries,
  resetTable,
  search,
  reload,
} = useTableMethod(
  EApiId.BRANCH_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Branch>[]) => {
  rawQueries.value = e;
  search();
};

const handleResizeColumn = (w: any, col: any) => {
  col.width = w;
};
</script>
