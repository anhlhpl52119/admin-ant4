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
        :scroll="{ y: 'calc(100rem - 40rem)' }"
      >
        <template #title>
          <CommonTableHeader
            v-model:current-page="paginationState.currentPage"
            v-model:record-per-page="paginationState.recordsPerPage"
            :totalRecord="totalRecords"
            @reload="reload"
          />
        </template>
        <ATableColumn key="index" title="Stt" width="5rem" align="center">
          <template #default="{ index }">
            {{ index + 1 }}
          </template>
        </ATableColumn>
        <ATableColumn key="name" title="Tên" data-index="name">
          <template #default="{ text: name }">
            <AButton type="link">
              {{ name }}
            </AButton>
          </template>
        </ATableColumn>
        <ATableColumn key="code" title="Mã">
          <template #default="{ record }: {record: API.Driver}">
            {{ record?.driver_code ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="phone" title="Số điện thoại">
          <template #default="{ record }: {record: API.Driver}">
            {{ record?.phone ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="address" title="Địa chỉ">
          <template #default="{ record }: {record: API.Driver}">
            {{ record?.address ?? '_' }}
          </template>
        </ATableColumn>
        <ATableColumn key="status" title="Status" width="10rem" align="center">
          <template #default="{ record }: {record: API.Driver}">
            <ATag color="success">
              {{ record?.status.toUpperCase() ?? '_' }}
            </ATag>
          </template>
        </ATableColumn>
        <ATableColumn key="edit" title="Action" width="8rem" align="center">
          <template #default="{ record }: {record: API.Driver}">
            <ATooltip title="Chỉnh sửa">
              <AButton :icon="h(EditOutlined)" @click="openModel(record.id)" />
            </ATooltip>
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
import { EditOutlined } from '@ant-design/icons-vue';
import { searchFilterRaw } from './column';
import { type QueriesRaw, useCommonTableMethod } from '@/composable/useCommonTableMethod';
import { EApiId } from '@/enums/request.enum';
import { FALLBACK_PAGINATION_API_RESPONSE } from '@/constants/common.constant';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';

const DriverCreateUpdateForm = defineAsyncComponent(() => import('@/components/form/DriverCreateUpdateForm.vue'));

const fetch = async (params?: API.SearchDriverQueryParams) => {
  const res = await driverApis.search(params);

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
