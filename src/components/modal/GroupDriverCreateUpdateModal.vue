<template>
  <AModal
    :open="open"
    :title="modalState.title"
    :ok-button-props="{ disabled: false }"
    :cancel-button-props="{ disabled: false }"
    :mask-closable="false"
    :confirm-loading="isSubmitLoading"
    :ok-text="modalState.okBtnText"
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
        <CInput v-model:value="createUpdateBodyState.retailer_id" label="Người sở hữu" />
      </template>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { groupDriverApis } from '@/apis/core/group-driver/group-driver.api';

const props = defineProps<{ groupDriverId?: string }>();

const appStore = useApplicationStore();

const open = ref<boolean>(true);

const modalState = reactive({
  title: 'Tạo mới nhóm tài xế',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<CreateGroupDriverRequestBody>({
  name: 'Nhóm Tài Xế Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  description: 'Hung Anh test',
  email: 'taixeanhlhpl@taixe.vn',
  retailer_id: '2f1f6f7b-4bef-462d-b611-811262bb6c48',
});

const isSubmitLoading = computed(() =>
  appStore.loadingAppState.has(EApiId.GROUP_DRIVER_CREATE)
 || appStore.loadingAppState.has(EApiId.GROUP_DRIVER_UPDATE));

const isUpdateMode = computed(() => !!props.groupDriverId);

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
