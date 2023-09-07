import type { TableColumnType } from 'ant-design-vue';
import { driverApis } from '@/apis/core/driver/driver.api';

export const useDriverTableData = () => {
  const driverState = ref<Driver[]>([]);
  const isFetching = ref<boolean>(false);
  const queryState = reactive<SearchDriverQueryParams>({
    page: 1,
    items: 10,
    query: {},
  });

  const fetch = async (option?: SearchDriverQueryParams) => {
    const params = { ...queryState, ...option };
    isFetching.value = true;
    try {
      const res = await driverApis.search(params);
      driverState.value = res.data.drivers;
    } catch (error) {
      Promise.reject(error);
    } finally {
      isFetching.value = false;
    }
  };

  // watch(queryState, () => {
  //   fetch();
  // });

  const columns: TableColumnType<Driver>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      customFilterDropdown: true,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      customFilterDropdown: true,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  fetch();

  return {
    columns,
    driverState,
    isFetching,
  };
};
