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
        v-if="appStore.loadingAppState.has(EApiId.RETAILER_DETAILS)"
        size="large"
        tip="Đang tải..."
        class="m-30"
      />
      <template v-else>
        <CInput v-model:value="createUpdateBodyState.name" label="Tên Nhà Bán Lẻ" />
        <CInput v-model:value="createUpdateBodyState.code" label="Mã Nhà Bán Lẻ" />
        <CInput v-model:value="createUpdateBodyState.address" label="Địa chỉ" />
        <CInput v-model:value="createUpdateBodyState.phone" label="Số điện thoại" />
        <CInput v-model:value="createUpdateBodyState.description" label="Mô tả" />
        <CInput v-model:value="createUpdateBodyState.email" label="Email" />
      </template>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';

const props = defineProps<{ retailerId?: string }>();

const appStore = useApplicationStore();

const open = ref<boolean>(true);
const modalState = reactive({
  title: 'Tạo mới nhà bán lẻ',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<API.CreateRetailerRequestBody>({
  name: 'Nhà bán lẻ Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  phone: '0528661429',
  description: 'Hung Anh test',
  email: 'nhabanleanhlhpl@taixe.vn',
});

const isSubmitLoading = computed(() =>
  appStore.loadingAppState.has(EApiId.RETAILER_CREATE)
 || appStore.loadingAppState.has(EApiId.RETAILER_UPDATE));

const isUpdateMode = computed(() => !!props.retailerId);

const onCloseModal = (forceReloadTable: boolean = false) => {
  if (forceReloadTable) {
    // reload(); //TODO: add reload
  }
  open.value = false;
  Modal.destroyAll();
};

const onSubmit = async () => {
  const rs = isUpdateMode.value
    ? await retailerApis.update(props.retailerId!, createUpdateBodyState)
    : await retailerApis.create(createUpdateBodyState);

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
  if (!props.retailerId) {
    return;
  }
  modalState.okBtnText = 'Update';
  modalState.title = 'Chỉnh sửa Thông tin';
  const res = await retailerApis.getDetails(props.retailerId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.code = res?.data?.code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.phone = res?.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
};
init();
</script>
