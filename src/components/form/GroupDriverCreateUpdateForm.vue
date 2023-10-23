<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadingIds.has(EApiId.GROUP_DRIVER_DETAILS) || loadingIds.has(EApiId.GROUP_DRIVER_UPDATE)"
    >
      <template v-if="!loadingIds.has(EApiId.GROUP_DRIVER_DETAILS)">
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
              placeholder="Nhập tên"
              label="Tên nhóm tài xế"
            />
          </AFormItem>
          <AFormItem name="description" class="w-full">
            <CInput
              v-model:value="createUpdateBodyState.description"
              :maxlength="50"
              placeholder="Nhập mô tả"
              label="Mô tả"
            />
          </AFormItem>
          <AFormItem name="address" class="w-full">
            <CInput
              v-model:value="createUpdateBodyState.address"
              :maxlength="50"
              placeholder="Nhập địa chỉ"
              label="Địa chỉ"
            />
          </AFormItem>
          <!-- <AFormItem name="phone" v-bind="naPhoneNumber">
            <CInput
              v-model:value="createUpdateBodyState.phone"
              :maxlength="12"
              placeholder="số điện thoại"
              acceptedOnly="number"
              label="Số điện thoại"
            />
          </AFormItem> -->
          <AFormItem name="email">
            <p class="font-medium">
              Nhập email
            </p>
            <EmailAutoComplete v-model:value="createUpdateBodyState.email" />
          </AFormItem>
          <div class="flex justify-center gap-10">
            <AButton
              type="primary"
              :loading="loadingIds.has(EApiId.RETAILER_CREATE) || loadingIds.has(EApiId.RETAILER_USER_UPDATE)"
              :disabled="false"
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
import type { DefaultOptionType } from 'ant-design-vue/es/select';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { groupDriverApis } from '@/apis/retailer/group-driver-mgt/group-driver-mgt';

const props = defineProps<{ groupId: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadingIds } = storeToRefs(useVisibilityStore());
const { checkName, checkEmail } = useFieldValidation();

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

const createUpdateBodyState = reactive<API.CreateUpdGroupDriverRequestBody>({
  name: '',
  email: '',
  address: '',
  description: '',
});

const rules: { [k in keyof API.CreateUpdGroupDriverRequestBody]?: Rule[] } = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  email: [{ validator: checkEmail, trigger: 'change' }],
};

const isUpdateMode = computed(() => !!props.groupId);

const handleFinishFailed = async (errors: ValidateErrorEntity) => {
// TODO: add scroll to first error field to improve user behavior
};

const onValidateSuccess = async () => {
  const rs = isUpdateMode.value
    ? await groupDriverApis.update(props.groupId!, createUpdateBodyState)
    : await groupDriverApis.create(createUpdateBodyState);

  if (!rs) {
    return;
  }
  emits('success');
};

const init = async () => {
  if (!props.groupId) {
    return;
  }

  const res = await groupDriverApis.getDetails(props.groupId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res.data?.name ?? '';
  createUpdateBodyState.address = res.data?.address ?? '';
  createUpdateBodyState.email = res.data?.email ?? '';
  createUpdateBodyState.description = res.data?.description ?? '';
};
init();
</script>
