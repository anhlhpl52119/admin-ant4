<template>
  <div>
    <CommonPageTitle
      title="Quản lý tài xế"
      actionBtnLabel="Mời tài xế"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :rawSearchableItems="searchFilterRaw"
      :loading="isFetching"
      quickSearchKey="name_or_phone_cont"
      @search="onSearch"
      @reset="resetTable"
    />

    <section class="card">
      <ATable
        :data-source="tableRecords"
        size="small"
        :loading="isFetching"
        :pagination="false"
        class="cursor-default"
        :scroll="{ y: 'calc(100rem - 40rem)' }"
        @resizeColumn="handleResizeColumn"
      >
        <template #title>
          <CommonTableHeader
            :currentPage="tableState.currentPage"
            :pageSize="tableState.pageSize"
            :totalRecord="tableState.totalRecords"
            @pageChange="handlePageChange"
            @reload="reload"
          />
        </template>
        <ATableColumn key="name" title="Tên tài xế" :resizable="true" :ellipsis="true" :maxWidth="300" :minWidth="100" :width="columnWidthRef.name" fixed="left">
          <template #default="{ record }: {record: API.Driver}">
            <AButton type="link" class="p0">
              {{ record.name }}
            </AButton>
          </template>
        </ATableColumn>
        <ATableColumn key="phone" title="Số điện thoại" width="15rem" align="center">
          <template #default="{ record }: {record: API.Driver}">
            <div
              class="flex-center gap-5 cursor-pointer hover:text-primary"
              @click="copyText(record?.phone ?? '_')"
            >
              <span>{{ record?.phone ?? '_' }}</span>
              <i class="i-solar:copy-outline inline-block text-primary" />
            </div>
          </template>
        </ATableColumn>
        <ATableColumn key="mail" :ellipsis="true" width="20rem">
          <template #title>
            <div class=" flex gap-5 items-center">
              <i class="i-material-symbols:alternate-email-rounded block text-22 text-primary" />
              <span>Email</span>
            </div>
          </template>
          <template #default="{ record }: {record: API.Driver}">
            <span>{{ record?.email ?? '_' }}</span>
          </template>
        </ATableColumn>
        <ATableColumn key="address" title="Địa chỉ" :ellipsis="true">
          <template #default="{ record }: {record: API.Driver}">
            {{ record?.address ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="status" title="Status" width="15rem" align="center" fixed="right">
          <template #default="{ record }: {record: API.Driver}">
            <DynamicTag :status="record?.status ?? ''" />
          </template>
        </ATableColumn>
        <template #emptyText>
          Không tìm thấy tài xế
        </template>
      </ATable>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { searchFilterRaw } from './column';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { copyText } from '@/utils/common.util';
import { type QueriesRaw, useTableMethod } from '@/composable/useTableMethod';

const CreateDriverInvitationForm = defineAsyncComponent(() => import('@/components/form/CreateDriverInvitationForm.vue'));

const columnWidthRef = reactive<Record<string, number>>({
  name: 170,
  address: 400,
});
const fetch = async (params?: API.SearchDriverQueryParams) => {
  const res = await retailerDriverApis.searchIndependentDrivers(params);

  if (!(res && res.data) || res.data.drivers.length === 0) {
    return FALLBACK_PAGINATION_API_RESPONSE;
  }

  return {
    records: res.data.drivers,
    current_page: res.data.current_page ?? 1,
    total_page: res.data.total_page,
    total_records: res.data.total_records,
  };
};

const {
  handlePageChange,
  isFetching,
  tableRecords,
  tableState,
  rawQueries,
  resetTable,
  search,
  reload,
} = useTableMethod(
  EApiId.DRIVER_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Driver>[]) => {
  rawQueries.value = e;
  search();
};

const handleResizeColumn = (width: number, colInfo: any) => {
  if (!columnWidthRef[colInfo.key]) {
    return;
  }
  columnWidthRef[colInfo.key] = width;
};

const openModel = () => {
  coreModal.show({
    component: CreateDriverInvitationForm,
    title: 'Tạo lời mời tham gia cho tài xế',
    props: {},
    emits: {
      success: () => {},
    },
  });
};
</script>
