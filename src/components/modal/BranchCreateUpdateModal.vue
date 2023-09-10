<template>
  <AModal
    :open="open"
    :title="modalState.title"
    :ok-button-props="{ disabled: false }"
    :cancel-button-props="{ disabled: false }"
    :mask-closable="false"
    :confirm-loading="appStore.loadingAppState.has(EApiId.BRANCH_CREATE)"
    :ok-text="modalState.okBtnText"
    @ok="onSubmit"
    @cancel="onCloseModal"
  >
    <div class="grid gap-15">
      <ASpin
        v-if="appStore.loadingAppState.has(EApiId.BRANCH_DETAILS)"
        size="large"
        tip="Đang tải..."
        class="m-30"
      />
      <template v-else>
        <CInput v-model:value="createUpdateBodyState.name" label="Tên chi nhánh" />
        <CInput v-model:value="createUpdateBodyState.code" label="Mã chi nhánh:" />
        <CInput v-model:value="createUpdateBodyState.address" label="Địa chỉ" />
        <CInput v-model:value="createUpdateBodyState.contact_number" label="Số điện thoại" />
        <CInput v-model:value="createUpdateBodyState.description" label="Mô tả" />
        <CInput v-model:value="createUpdateBodyState.email" label="Email" />
        <CInput v-model:value="createUpdateBodyState.retailer_id" label="Người sở hữu" />
      </template>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { branchApis } from '@/apis/core/branch/branch.api';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';

const props = defineProps<{ branchId?: string }>();

const appStore = useApplicationStore();

const open = ref<boolean>(true);
const modalState = reactive({
  title: 'Tạo Chi Nhánh',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<CreateBranchRequestBody>({
  name: 'Cửa hàng Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  contact_number: '0528661429',
  description: 'Hung Anh test',
  email: 'anhlh@takeit.vn',
  retailer_id: '2f1f6f7b-4bef-462d-b611-811262bb6c48',
});

const isUpdateMode = computed(() => !!props.branchId);

const onCloseModal = () => {
  open.value = false;
  Modal.destroyAll();
};

const onSubmit = async () => {
  const rs = isUpdateMode.value
    ? await branchApis.update(props.branchId!, createUpdateBodyState)
    : await branchApis.create(createUpdateBodyState);

  if (!rs || rs) {
    Modal.error({
      content: 'Thất bại',
    });

    return;
  }

  Modal.success({
    content: 'Thành công',
    onOk: () => onCloseModal(),
  });
};

const init = async () => {
  if (!props.branchId) {
    return;
  }
  modalState.okBtnText = 'Update';
  modalState.title = 'Chỉnh sửa Thông tin';
  const res = await branchApis.getDetails(props.branchId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.code = res?.data?.code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.contact_number = res?.data?.contact_number ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
  createUpdateBodyState.retailer_id = res?.data?.retailer_id ?? '';
};
init();
</script>
