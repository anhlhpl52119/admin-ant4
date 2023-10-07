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
        v-if="appStore.loadingAppState.has(EApiId.DRIVER_DETAILS)"
        size="large"
        tip="Đang tải..."
        class="m-30"
      />
      <template v-else>
        <CInput v-model:value="createUpdateBodyState.name" label="Tên Tài Xế" />
        <CInput v-model:value="createUpdateBodyState.code" label="Mã Tài Xế" />
        <CInput v-model:value="createUpdateBodyState.address" label="Địa chỉ" />
        <CInput v-model:value="createUpdateBodyState.phone" label="Số điện thoại" />
        <CInput v-model:value="createUpdateBodyState.description" label="Mô tả" />
        <CInput v-model:value="createUpdateBodyState.email" label="Email" />
        <CInput v-model:value="createUpdateBodyState.user_id" label="Người sở hữu" />
      </template>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { driverApis } from '@/apis/core/driver/driver.api';

const props = defineProps<{ driverId?: string }>();

const appStore = useApplicationStore();

const open = ref<boolean>(true);
const modalState = reactive({
  title: 'Tạo mới tài xế',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<API.CreateDriverRequestBody>({
  name: 'Tài xế Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  phone: '0528661429',
  description: 'Hung Anh test',
  email: 'taixeanhlhpl@taixe.vn',
  user_id: 'c0cf9614-e254-4e31-a183-e3e481785197',
});

const isSubmitLoading = computed(() =>
  appStore.loadingAppState.has(EApiId.DRIVER_CREATE)
 || appStore.loadingAppState.has(EApiId.DRIVER_UPDATE));

const isUpdateMode = computed(() => !!props.driverId);

const onCloseModal = (forceReloadTable: boolean = false) => {
  if (forceReloadTable) {
    // reload(); //TODO: add reload
  }
  open.value = false;
  Modal.destroyAll();
};

const onSubmit = async () => {
  const rs = isUpdateMode.value
    ? await driverApis.update(props.driverId!, createUpdateBodyState)
    : await driverApis.create(createUpdateBodyState);

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
  if (!props.driverId) {
    return;
  }
  modalState.okBtnText = 'Update';
  modalState.title = 'Chỉnh sửa Thông tin';
  const res = await driverApis.getDetails(props.driverId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.code = res?.data?.code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.phone = res?.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
  createUpdateBodyState.user_id = res?.data?.user_id ?? '';
};
init();
</script>
