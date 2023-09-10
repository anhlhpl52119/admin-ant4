import type { TableColumnType } from 'ant-design-vue';
import { branchApis } from '@/apis/core/branch/branch.api';

import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';

export const useBranchTable = () => {
  const appStore = useApplicationStore();

  const branchesState = ref<Branch[]>([]);

  const queriesState = ref<SearchBranchQueryParams['query']>({});

  const lastedQueries: SearchBranchQueryParams['query'] = {};

  const flag = ref<boolean>(false);
  const tableLoading = computed(() => appStore.loadingAppState.has(EApiId.BRANCH_SEARCH));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const fetchQueriesParams = computed<SearchBranchQueryParams>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }));

  const fetch = async (optional?: SearchBranchQueryParams) => {
    branchesState.value = [];
    const params = { ...fetchQueriesParams.value, ...optional };
    lastedQueries.value = params.query;
    const res = await branchApis.search(params);

    if (!(res && res.data) || res.data.branches.length === 0) {
      return;
    }

    paginationState.viewBy = params?.items ?? 10;
    branchesState.value = res.data.branches;
    paginationState.totalRecord = res.data.total_records;
    paginationState.totalPage = res.data.total_page;

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

  const onPageSizeChange = () => {
    paginationState.currentPage = 1;
  };

  const columns: TableColumnType<Branch>[] = [
    {
      title: 'STT',
      dataIndex: 'indexNum',
      width: 25,
      align: 'center',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'contact_number',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    },
    {
      dataIndex: 'edit',
      width: 10,
    },
  ];

  fetch();

  return {
    columns,
    tableLoading,
    branchesState,
    paginationState,
    queriesState,

    onPageSizeChange,
    reload,
    search,
  };
};
