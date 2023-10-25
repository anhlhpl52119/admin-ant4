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
            <FieldTitle title="Tên nhóm tài xế" required>
              <CInput
                v-model:value="createUpdateBodyState.name"
                :maxlength="50"
                placeholder="Nhập tên"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="address" class="w-full">
            <FieldTitle title="Địa chỉ" required>
              <CInput
                v-model:value="createUpdateBodyState.address"
                :maxlength="50"
                placeholder="Nhập địa chỉ"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="description" class="w-full">
            <FieldTitle title="Mô tả">
              <CInput
                v-model:value="createUpdateBodyState.description"
                :maxlength="50"
                placeholder="Nhập mô tả"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="email">
            <FieldTitle title="Nhập email">
              <EmailAutoComplete v-model:value="createUpdateBodyState.email" />
            </FieldTitle>
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
const { checkName } = useFieldValidation();

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

const createUpdateBodyState = reactive<Required<API.CreateUpdGroupDriverRequestBody>>({
  name: '',
  email: '',
  address: '',
  description: '',
  status: '',
});

const rules: { [k in keyof API.CreateUpdGroupDriverRequestBody]?: Rule[] } = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  address: [{ required: true, message: 'Địa chỉ ko được bỏ trống' }],
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
