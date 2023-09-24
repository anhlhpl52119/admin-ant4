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
  api: (optional?: ApiCoreQuery<T, any>) => Promise<Res<T>>) => {
  const appStore = useApplicationStore();

  const stateRecords = ref<T[]>([]) as Ref<T[]>;

  const queriesState = ref<ApiQueryAttr<T>>({}) as Ref<ApiQueryAttr<T>>;

  const tableLoading = computed(() => appStore.loadingAppState.has(loadingNameSpace));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const paginationSS = reactive({
    page: 1,
    items: 10,
  });

  const queriesFinal = ref<ApiQueryAttr<T>>({}) as Ref<ApiQueryAttr<T>>;

  const fetchPr = computed<ApiCoreQuery<T>>(() => ({
    ...paginationSS,
    query: { ...queriesFinal.value },
  }));

  const fetchPr2 = computed(() => ({
    paging: { ...paginationSS },
    queries: { ...queriesState.value },
  }));
  interface Page {
    page: number
    items: number
  }
  const fetch2 = async (forceOptions?: ApiCoreQuery<T>) => {
    const page: Page = { ...fetchPr2.value.paging };

    stateRecords.value = [];

    const params = { ...fetchPr.value, ...forceOptions };

    const resApi = await api(params);

    paginationState.viewBy = params?.items ?? 10;

    stateRecords.value = resApi.records;
    paginationState.totalRecord = resApi.total_records;
    paginationState.totalPage = resApi.total_page;

    if (forceOptions?.query) {
      queriesState.value = { ...forceOptions.query };
    }
  };
  watch(paginationSS, () => {
    fetch2();
  });

  const fetchQueriesParams = computed<ApiCoreQuery<T>>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }) as ApiCoreQuery<T>);

  const fetch = async (optional?: ApiCoreQuery<T>) => {
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

  const search = (queries?: ApiQueryAttr<T>) => {
    fetch({ page: 1, query: queries });
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
