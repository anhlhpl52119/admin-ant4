import type { TableColumnType } from 'ant-design-vue';

import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { driverApis } from '@/apis/core/driver/driver.api';

export const useDriverTable = () => {
  const appStore = useApplicationStore();

  const driversState = ref<Driver[]>([]);

  const queriesState = ref<SearchDriverQueryParams['query']>({});

  const lastedQueries: SearchDriverQueryParams['query'] = {};

  const flag = ref<boolean>(false);
  const tableLoading = computed(() => appStore.loadingAppState.has(EApiId.DRIVER_SEARCH));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const fetchQueriesParams = computed<SearchDriverQueryParams>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }));

  const fetch = async (optional?: SearchDriverQueryParams) => {
    driversState.value = [];
    const params = { ...fetchQueriesParams.value, ...optional };
    lastedQueries.value = params.query;
    const res = await driverApis.search(params);

    if (!(res && res.data) || res.data.drivers.length === 0) {
      return;
    }

    paginationState.viewBy = params?.items ?? 10;
    driversState.value = res.data.drivers;
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
      width: 10,
    },
  ];

  fetch();

  return {
    columns,
    tableLoading,
    driversState,
    paginationState,
    queriesState,

    onPageSizeChange,
    reload,
    search,
  };
};
