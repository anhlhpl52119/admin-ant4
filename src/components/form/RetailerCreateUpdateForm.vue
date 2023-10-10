<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadingIds.has(EApiId.RETAILER_DETAILS) || loadingIds.has(EApiId.RETAILER_UPDATE) || loadingIds.has(EApiId.RETAILER_CREATE)"
    >
      <template v-if="!loadingIds.has(EApiId.RETAILER_DETAILS)">
        <AForm
          v-bind="formItemLayout"
          :rules="rules"
          :model="createUpdateBodyState"
          @finish="onValidateSuccess"
          @finishFailed="handleFinishFailed"
        >
          <AFormItem name="name" class="w-full">
            <CInput
              v-model:value="createUpdateBodyState.name"
              :maxlength="50"
              label="Tên Nhà Bán Lẻ"
            />
          </AFormItem>
          <AFormItem name="code">
            <CInput
              v-model:value="createUpdateBodyState.code"
              :maxlength="20"
              label="Mã Nhà Bán Lẻ"
            />
          </AFormItem>
          <AFormItem name="phone">
            <CInput
              v-model:value="createUpdateBodyState.phone"
              :maxlength="12"
              label="Số điện thoại"
            />
          </AFormItem>
          <AFormItem>
            <CInput
              v-model:value="createUpdateBodyState.address"
              :maxlength="250"
              label="Địa chỉ"
            />
          </AFormItem>
          <AFormItem>
            <CInput
              v-model:value="createUpdateBodyState.description"
              :maxlength="300"
              label="Mô tả"
            />
          </AFormItem>
          <AFormItem>
            <CInput
              v-model:value="createUpdateBodyState.email"
              :maxlength="80"
              label="Email"
            />
          </AFormItem>
          <div class="flex justify-center gap-10">
            <AButton
              type="primary"
              :loading="loadingIds.has(EApiId.RETAILER_CREATE) || loadingIds.has(EApiId.RETAILER_UPDATE)"
              htmlType="submit"
            >
              Xác nhận
            </AButton>
            <AButton style="margin-left: 10px" @click="$emit('cancel', undefined)">
              Đóng
            </AButton>
          </div>
        </AForm>
      </template>
    </ASpin>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { useFieldValidation } from '@/composable/useFieldValidation';

const props = defineProps<{ retailerId: string; sth?: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();
const { loadingIds } = storeToRefs(useVisibilityStore());
const { checkCode, checkName, checkPhoneNumber } = useFieldValidation();

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const rules: Record<string, Rule[]> = {
  name: [{ validator: checkName, trigger: 'blur' }],
  code: [{ validator: checkCode, trigger: 'blur' }],
  phone: [{ validator: checkPhoneNumber, trigger: ['blur', 'change'] }],
};

const createUpdateBodyState = reactive<API.CreateRetailerRequestBody>({
  name: '',
  code: '',
  address: '',
  phone: '',
  description: '',
  email: '',
});

const isUpdateMode = computed(() => !!props.retailerId);

const handleFinishFailed = (errors: any) => {
  console.log('false', errors);
};

const onValidateSuccess = async () => {
  const rs = isUpdateMode.value
    ? await retailerApis.update(props.retailerId!, createUpdateBodyState)
    : await retailerApis.create(createUpdateBodyState);

  if (!rs) {
    return;
  }
  emits('success');
};

const init = async () => {
  if (!props.retailerId) {
    return;
  }
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
