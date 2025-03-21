<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadIdsHas([EApiId.RETAILER_USER_DETAILS, EApiId.RETAILER_USER_UPDATE])"
    >
      <template v-if="!loadIdsHas(EApiId.RETAILER_USER_DETAILS)">
        <AForm
          v-bind="formItemLayout"
          :rules="rules"
          :model="createUpdateBodyState"
          @finish="onValidateSuccess"
        >
          <AFormItem name="name" class="w-full">
            <FieldTitle title="Tên người dùng" required>
              <CInput
                v-model:value="createUpdateBodyState.name"
                :maxlength="50"
                placeholder="Nhập tên"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="phone" v-bind="naPhoneNumber">
            <FieldTitle title="Số điện thoại" required>
              <CInput
                v-model:value="createUpdateBodyState.phone"
                :maxlength="12"
                placeholder="số điện thoại"
                :replaceSymbol="[NUMBER_ONLY]"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="email">
            <FieldTitle title="Nhập email" required>
              <EmailAutoComplete v-model:value="createUpdateBodyState.email" />
            </FieldTitle>
          </AFormItem>
          <div class="flex justify-center gap-10">
            <AButton
              type="primary"
              :loading="loadIdsHas([EApiId.RETAILER_CREATE, EApiId.RETAILER_USER_UPDATE])"
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
import { EApiId } from '@/enums/request.enum';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { retailerUserApis } from '@/apis/retailer/user-mgt/user-mgt.api';
import { NUMBER_ONLY } from '@/constants/regex.constant';

const props = defineProps<{ userId: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { checkName, checkPhoneNumber, checkEmail } = useFieldValidation();
const { loadIdsHas } = storeToRefs(useLoaderStore());

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

const createUpdateBodyState = reactive<API.CreateUpdRetailerUserRequestBody>({
  name: '',
  phone: '',
  email: '',
  role: 'user',
});

const naPhoneNumber = computed(() => {
  if (createUpdateBodyState.phone.length === 9) {
    return {
      validateStatus: 'warning',
      help: 'Số điện thoại có vẻ không đúng',
    };
  }

  return undefined;
});

const rules: { [k in keyof API.CreateUpdRetailerUserRequestBody]?: Rule[] } = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  phone: [{ validator: checkPhoneNumber, trigger: ['blur', 'change'] }],
  email: [{ validator: checkEmail, trigger: 'change' }],
  role: [{ required: true, message: 'Phân quyền không được để trống' }],
};

const isUpdateMode = computed(() => !!props.userId);

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().includes(input.toLowerCase()) >= 0;
};

const onValidateSuccess = async () => {
  const rs = isUpdateMode.value
    ? await retailerUserApis.update(props.userId!, createUpdateBodyState)
    : await retailerUserApis.create(createUpdateBodyState);

  if (!rs) {
    return;
  }
  emits('success');
};

const init = async () => {
  if (!props.userId) {
    return;
  }

  const res = await retailerUserApis.getDetails(props.userId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res.data?.name ?? '';
  createUpdateBodyState.phone = res.data?.phone ?? '';
  createUpdateBodyState.email = res.data?.email ?? '';
  createUpdateBodyState.role = res.data?.role ?? '';
};
init();
</script>
