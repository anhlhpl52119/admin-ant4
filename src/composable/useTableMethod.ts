import type { EApiId } from '@/enums/request.enum';
import { useVisibilityStore } from '@/stores/visibility.store';
import { mergeValues } from '@/utils/common.util';

export interface Res<T> {
  records: T[]
  current_page: number
  total_page: number
  total_records: number
}

export interface QueriesRaw<T> {
  label: string
  key: keyof RansackQuery<T>
  value: string
}

interface Page {
  currentPage: number
  totalRecords: number
  totalPage: number
  pageSize: number
}

export const useTableMethod = <T>(
  loadingNameSpace: EApiId,
  fetchFunc: (optional?: ApiCoreQuery<T, any>) => Promise<Res<T>>) => {
  const { loadingIds } = useVisibilityStore();

  const rawRecords: Ref<T[]> = ref([]);

  const tableState = reactive({
    currentPage: 1,
    totalRecords: 0,
    totalPage: 1,
    pageSize: 10,
  });

  const rawQueries = ref<QueriesRaw<T>[]>([]);

  const isFetching = computed(() => loadingIds.has(loadingNameSpace));

  const apiQueries = computed<ApiQueryAttr<T>>(() => {
    const queries: ApiQueryAttr<T> = {};
    rawQueries.value.forEach(({ value, key }) => {
      if (value) {
        Object.assign(queries, { [key]: value });
      }
    });

    return queries;
  });

  const fetchData = async (forcePage?: Partial<ApiPaginationQuery>) => {
    const paging: ApiPaginationQuery = {
      items: forcePage?.items ?? tableState.pageSize,
      page: forcePage?.page ?? tableState.currentPage,
    };

    const {
      current_page,
      records,
      total_page,
      total_records,
    } = await fetchFunc({ ...paging, query: apiQueries.value });

    // handle fetch empty page record
    if (current_page > 1 && records.length === 0) {
      fetchData({ page: current_page - 1 });

      return;
    }

    rawRecords.value = records || [];
    tableState.totalRecords = total_records || 0;
    tableState.currentPage = current_page || 0;
    tableState.totalPage = total_page || 0;
    tableState.pageSize = paging?.items ?? 10;
  };

  const handlePageChange = (v: Partial<Page>) => {
    if (Object.keys(v).length === 0) {
      return;
    }
    mergeValues(tableState, v);
    fetchData();
  };

  const search = () => {
    fetchData({ page: 1 });
  };

  const reload = () => {
    fetchData();
  };

  const resetTable = () => {
    rawQueries.value = [];
    fetchData({ page: 1 });
  };

  fetchData();

  return {
    isFetching,
    tableRecords: rawRecords,
    rawQueries,
    tableState: readonly(tableState),

    handlePageChange,
    resetTable,
    reload,
    search,
  };
};
