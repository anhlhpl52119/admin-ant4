import { useApplicationStore } from '@/stores/application.store';
import type { EApiId } from '@/enums/request.enum';

interface Res<T> {
  records: T[]
  current_page: number
  total_page: number
  total_records: number
}
export const useCommonTableMethod = <T>(
  loadingNameSpace: EApiId,
  api: (optional?: ApiQuery<T, any>) => Promise<Res<T>>) => {
  const appStore = useApplicationStore();

  const stateRecords = ref<T[]>([]) as Ref<T[]>;

  const queriesState = ref<ApiQuery<T>['query']>({}) as Ref<ApiQuery<T>['query']>;

  const flag = ref<boolean>(false);

  const tableLoading = computed(() => appStore.loadingAppState.has(loadingNameSpace));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const fetchQueriesParams = computed<ApiQuery<T>>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }) as ApiQuery<T>);

  const fetch = async (optional?: ApiQuery<T>) => {
    stateRecords.value = [];
    const params = { ...fetchQueriesParams.value, ...optional };

    const resApi = await api(params);

    paginationState.viewBy = params?.items ?? 10;

    stateRecords.value = resApi.records;
    paginationState.totalRecord = resApi.total_records;
    paginationState.totalPage = resApi.total_page;

    if (optional?.query) {
      queriesState.value = { ...optional.query };
    }
  };

  const search = () => {
    if (flag.value) {
      return;
    }
    fetch();
  };

  const reload = () => {
    fetch();
  };

  watch(fetchQueriesParams, () => {
    fetch();
  });

  fetch();

  return {
    tableLoading,
    stateRecords,
    paginationState,
    queriesState,

    reload,
    search,
  };
};
