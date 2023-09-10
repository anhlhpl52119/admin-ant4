import type { TableColumnType } from 'ant-design-vue';

import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { groupDriverApis } from '@/apis/core/group-driver/group-driver.api';

export const useGroupDriverTable = () => {
  const appStore = useApplicationStore();

  const groupDriverState = ref<GroupDriver[]>([]);

  const queriesState = ref<SearchGroupDriverQueryParams['query']>({});

  const lastedQueries: SearchGroupDriverQueryParams['query'] = {};

  const flag = ref<boolean>(false);
  const tableLoading = computed(() => appStore.loadingAppState.has(EApiId.GROUP_DRIVER_SEARCH));

  const paginationState = reactive({
    totalRecord: 0,
    totalPage: 1,
    currentPage: 1,
    viewBy: 10,
  });

  const fetchQueriesParams = computed<SearchGroupDriverQueryParams>(() => ({
    page: paginationState.currentPage,
    items: paginationState.viewBy,
    query: queriesState.value,
  }));

  const fetch = async (optional?: SearchGroupDriverQueryParams) => {
    groupDriverState.value = [];
    const params = { ...fetchQueriesParams.value, ...optional };
    lastedQueries.value = params.query;
    const res = await groupDriverApis.search(params);

    if (!(res && res.data) || res.data.group_drivers.length === 0) {
      return;
    }

    paginationState.viewBy = params?.items ?? 10;
    groupDriverState.value = res.data.group_drivers;
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

  const columns: TableColumnType<GroupDriver>[] = [
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
    groupDriverState,
    paginationState,
    queriesState,

    onPageSizeChange,
    reload,
    search,
  };
};
