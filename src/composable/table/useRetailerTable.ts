import type { TableColumnType } from 'ant-design-vue';

import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';

export const useRetailerTable = () => {
  const appStore = useApplicationStore();

  const retailerState = ref<Retailer[]>([]);

  const queriesState = ref<SearchRetailerQueryParams['query']>({});

  const lastedQueries: SearchRetailerQueryParams['query'] = {};

  const flag = ref<boolean>(false);
  const tableLoading = computed(() => appStore.loadingAppState.has(EApiId.RETAILER_SEARCH));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const fetchQueriesParams = computed<SearchRetailerQueryParams>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }));

  const fetch = async (optional?: SearchRetailerQueryParams) => {
    retailerState.value = [];
    const params = { ...fetchQueriesParams.value, ...optional };
    lastedQueries.value = params.query;
    const res = await retailerApis.search(params);

    if (!(res && res.data) || res.data.retailers.length === 0) {
      return;
    }

    paginationState.viewBy = params?.items ?? 10;
    retailerState.value = res.data.retailers;
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

  const columns: TableColumnType<Retailer>[] = [
    {
      title: 'STT',
      dataIndex: 'indexNum',
      width: '7rem',
      align: 'center',
      fixed: 'left',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Mã',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
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
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      dataIndex: 'edit',
      width: '6rem',
      fixed: 'right',
    },
  ];

  fetch();

  return {
    columns,
    tableLoading,
    retailerState,
    paginationState,
    queriesState,

    onPageSizeChange,
    reload,
    search,
  };
};
