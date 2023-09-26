import { useApplicationStore } from '@/stores/application.store';
import type { EApiId } from '@/enums/request.enum';

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

export const useCommonTableMethod = <T>(
  loadingNameSpace: EApiId,
  api: (optional?: ApiCoreQuery<T, any>) => Promise<Res<T>>) => {
  const appStore = useApplicationStore();

  const rawQueries = ref<QueriesRaw<T>[]>([]);
  const recordsState = ref<T[]>([]) as Ref<T[]>;
  const totalRecords = ref<number>(0);
  const paginationState = reactive({
    recordsPerPage: 10,
    currentPage: 1,
    totalPage: 1,
  });

  const pageQuery = computed<ApiPaginationQuery>(() => ({
    items: paginationState.recordsPerPage,
    page: paginationState.currentPage,
  }));

  const isTableLoading = computed(() => appStore.loadingAppState.has(loadingNameSpace));

  const searchQueries = computed<ApiQueryAttr<T>>(() => {
    const temp: ApiQueryAttr<T> = {};
    rawQueries.value.forEach(({ value, key }) => {
      if (value) {
        Object.assign(temp, { [key]: value });
      }
    });

    return temp;
  });

  const triggerChange = async (forcePage: Partial<ApiPaginationQuery> = {}) => {
    const page = { ...pageQuery.value, ...forcePage };

    const {
      current_page,
      records,
      total_page,
      total_records,
    } = await api({ ...page, query: searchQueries.value });

    // handle fetch empty page record
    if (current_page > 1 && records.length === 0) {
      triggerChange({ page: current_page - 1 });

      return;
    }

    recordsState.value = records;
    totalRecords.value = total_records;
    paginationState.totalPage = total_page;
  };

  const search = () => {
    triggerChange({ page: 1 });
  };

  const reload = () => {
    triggerChange();
  };

  watch(pageQuery, (val: ApiPaginationQuery, old: ApiPaginationQuery) => {
    // TODO: refactor
    if (Object.values(val).sort() === Object.values(old).sort()) {
      return;
    }
    triggerChange();
  });

  triggerChange();

  return {
    isTableLoading,
    recordsState,
    paginationState,
    rawQueries,
    totalRecords,

    reload,
    search,
  };
};
