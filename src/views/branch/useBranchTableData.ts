import type { TableColumnType } from 'ant-design-vue';
import { branchApis } from '@/apis/core/branch/branch.api';

export const useBranchTableData = () => {
  const branchesState = ref<Branch[]>([]);
  const queryState = reactive<SearchBranchQueryParams>({
    page: 1,
    items: 10,
    query: {
      name_cont: '2',
    },
  });

  const fetch = async (option?: SearchBranchQueryParams) => {
    const params = { ...queryState, ...option };
    try {
      const res = await branchApis.search(params);
      branchesState.value = res.data.branches;
    } catch (error) {
      Promise.reject(error);
    }
  };

  watch(queryState, () => {
    fetch();
  });

  const columns: TableColumnType<Branch>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      customFilterDropdown: true,
      onFilter: (value: string | number | boolean, record: Branch) => {
        queryState.query.name_cont = value;
      },
      sorter: (a: Branch, b: Branch) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // defaultSortOrder: 'descend',
      // sorter: (a: Branch, b: Branch) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      // filters: [
      //   {
      //     text: 'London',
      //     value: 'London',
      //   },
      //   {
      //     text: 'New York',
      //     value: 'New York',
      //   },
      // ],
      // filterMultiple: false,
      customFilterDropdown: true,
      onFilter: (value: string | number | boolean, record: Branch) =>
        record.address.indexOf(value.toString()) === 0,
      sorter: (a: Branch, b: Branch) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  fetch();

  return {
    columns,
    branchesState,
  };
};
