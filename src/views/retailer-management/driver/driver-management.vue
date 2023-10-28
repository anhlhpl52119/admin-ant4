<template>
  <div>
    <CommonPageTitle
      title="Tài Xế"
      actionBtnLabel="Thêm Tài Xế"
      @onClickAction="openModel()"
    />

    <CommonTableSearchForm
      :raw="searchFilterRaw"
      :loading="isTableLoading"
      @search="onSearch"
      @reset="search"
    />

    <section class="card">
      <ATable
        :data-source="recordsState"
        size="small"
        :loading="isTableLoading"
        :pagination="false"
        class="cursor-default"
        :scroll="{ y: 'calc(100rem - 40rem)' }"
        @resizeColumn="handleResizeColumn"
      >
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
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
        <!-- <ATableColumn key="driver_code" title="Mã" width="18rem">
          <template #default="{ record }: {record: API.Driver}">
            <span>{{ record?.driver_code ?? '_' }}</span>
          </template>
        </ATableColumn> -->
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
        <ATableColumn key="address" title="Địa chỉ" :ellipsis="true" class="w-100">
          <template #default="{ record }: {record: API.Driver}">
            {{ record?.address ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="status" title="Status" width="8rem" align="center" fixed="right">
          <template #default="{ record }: {record: API.Driver}">
            <ATag color="success">
              <span class="ml0">  {{ record?.status.toUpperCase() ?? '_' }}</span>
            </ATag>
          </template>
        </ATableColumn>
        <!-- <ATableColumn key="edit" title="Action" width="8rem" align="center">
          <template #default="{ record }: {record: API.Driver}">
            <ATooltip title="Chỉnh sửa">
              <AButton :icon="h(EditOutlined)" @click="openModel(record.id)" />
            </ATooltip>
          </template>
        </ATableColumn> -->
        <template #emptyText>
          Không tìm thấy tài xế
        </template>
      </ATable>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { EditOutlined } from '@ant-design/icons-vue';
import { searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { retailerDriverApis } from '@/apis/retailer/driver-mgt/driver-mgt';
import { copyText } from '@/utils/common.util';

const DriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/DriverCreateUpdateForm.vue'));

const columnWidthRef = reactive<Record<string, number>>({
  name: 170,
  address: 400,
});
const fetch = async (params?: API.SearchDriverQueryParams) => {
  const res = await retailerDriverApis.search(params);

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
  isTableLoading,
  rawQueries,
  paginationState,
  recordsState,
  totalRecords,

  search,
  reload,
} = useCommonTableMethod(
  EApiId.DRIVER_SEARCH,
  fetch,
);

const onSearch = (e: QueriesRaw<API.Driver>[]) => {
  rawQueries.value = e;
  search();
};

const handleSuccess = (modalId: string) => {
  coreModal.close(modalId);
  search();
};

const handleResizeColumn = (width: number, colInfo: any) => {
  if (!columnWidthRef[colInfo.key]) {
    return;
  }
  columnWidthRef[colInfo.key] = width;
};

const openModel = (driverId?: string) => {
  const title = driverId ? 'Cập nhật thông tin nhà bán lẻ' : 'Tạo mới nhà bán lẻ';
  const modalId = coreModal.show({
    component: DriverCreateUpdateForm,
    title,
    props: {
      driverId: driverId ?? '',
    },
    emits: {
      success: () => handleSuccess(modalId),
      cancel: () => coreModal.close(modalId),
    },
  });
};
</script>
