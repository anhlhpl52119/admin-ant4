<template>
  <AModal
    :open="open"
    :title="modalState.title"
    :okButtonProps="{ disabled: false }"
    :cancelButtonProps="{ disabled: false }"
    :maskClosable="false"
    :confirmLoading="isSubmitLoading"
    :okText="modalState.okBtnText"
    @ok="onSubmit"
    @cancel="onCloseModal()"
  >
    <div class="grid gap-15">
      <ASpin
        v-if="appStore.loadingAppState.has(EApiId.GROUP_DRIVER_DETAILS)"
        size="large"
        tip="Đang tải..."
        class="m-30"
      />
      <template v-else>
        <CInput v-model:value="createUpdateBodyState.name" label="Tên Nhóm Tài Xế" />
        <CInput v-model:value="createUpdateBodyState.code" label="Mã Nhóm Tài Xế" />
        <CInput v-model:value="createUpdateBodyState.address" label="Địa chỉ" />
        <CInput v-model:value="createUpdateBodyState.description" label="Mô tả" />
        <CInput v-model:value="createUpdateBodyState.email" label="Email" />
        <CFetchOption
          v-model:initial-value="createUpdateBodyState.retailer_id"
          label="Người sở hữu"
          :requestData="composeRetailerOption"
          labelKey="name"
        />
      </template>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { groupDriverApis } from '@/apis/core/group-driver/group-driver.api';
import { retailerApis } from '@/apis/core/retailer/retailer.api';

const props = defineProps<{ groupDriverId?: string }>();

const appStore = useApplicationStore();

const open = ref<boolean>(true);

const modalState = reactive({
  title: 'Tạo mới nhóm tài xế',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<API.CreateGroupDriverRequestBody>({
  name: 'Nhóm Tài Xế Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  description: 'Hung Anh test',
  email: 'taixeanhlhpl@taixe.vn',
  retailer_id: '',
});

const isSubmitLoading = computed(() =>
  appStore.loadingAppState.has(EApiId.GROUP_DRIVER_CREATE)
 || appStore.loadingAppState.has(EApiId.GROUP_DRIVER_UPDATE));

const isUpdateMode = computed(() => !!props.groupDriverId);

const composeRetailerOption = async (query?: ApiQueryAttr<API.Retailer>) => {
  const rs = await retailerApis.search({ query });
  if (!rs || rs.data.retailers.length === 0) {
    return [];
  }

  return rs.data.retailers;
};

const onCloseModal = (forceReloadTable: boolean = false) => {
  if (forceReloadTable) {
    // reload(); //TODO: add reload
  }
  open.value = false;
  Modal.destroyAll();
};

const onSubmit = async () => {
  const rs = isUpdateMode.value
    ? await groupDriverApis.update(props.groupDriverId!, createUpdateBodyState)
    : await groupDriverApis.create(createUpdateBodyState);

  if (!rs) {
    Modal.error({
      content: 'Thất bại',
    });

    return;
  }

  Modal.success({
    content: 'Thành công',
    onOk: () => onCloseModal(true),
  });
};

const init = async () => {
  if (!props.groupDriverId) {
    return;
  }
  modalState.okBtnText = 'Update';
  modalState.title = 'Chỉnh sửa Thông tin';
  const res = await groupDriverApis.getDetails(props.groupDriverId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.code = res?.data?.code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
  createUpdateBodyState.retailer_id = res?.data?.retailer_id ?? '';
};
init();
</script>
