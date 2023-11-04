<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadingIds.has(EApiId.DRIVER_DETAILS) || loadingIds.has(EApiId.DRIVER_UPDATE) || loadingIds.has(EApiId.DRIVER_CREATE)"
    >
      <template v-if="!loadingIds.has(EApiId.DRIVER_DETAILS)">
        <AForm
          v-bind="formItemLayout"
          :rules="rules"
          :model="createUpdateBodyState"
          @finish="onValidateSuccess"
        >
          <AFormItem name="name" class="w-full">
            <FieldTitle title="Tên tài xế" required>
              <CInput
                v-model:value="createUpdateBodyState.name"
                :maxlength="50"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="driver_code">
            <FieldTitle title="Mã tài xế" required>
              <CInput
                v-model:value="createUpdateBodyState.driver_code"
                noSpace
                inputCase="upper"
                :maxlength="20"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="phone">
            <FieldTitle title="Số điện thoại" required>
              <CInput
                v-model:value="createUpdateBodyState.phone"
                :maxlength="12"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem>
            <FieldTitle title="Địa chỉ" required>
              <CInput
                v-model:value="createUpdateBodyState.address"
                :maxlength="250"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem>
            <FieldTitle title="Mô tả" required>
              <CInput
                v-model:value="createUpdateBodyState.description"
                :maxlength="300"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="user_id">
            <FieldTitle title="Người sở hữu" required>
              <CFetchOption
                v-model:initial-value="createUpdateBodyState.user_id"
                :requestData="composeRetailerOption"
                labelKey="name"
              />
            </FieldTitle>
          </AFormItem>
          <div class="flex justify-center gap-10">
            <AButton
              type="primary"
              :loading="loadingIds.has(EApiId.DRIVER_CREATE) || loadingIds.has(EApiId.DRIVER_UPDATE)"
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
import { useFieldValidation } from '@/composable/useFieldValidation';
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';
import { driverApis } from '@/apis/sys-admin/driver-mgt/driver-mgt';

const props = defineProps<{
  driverId: string
  sth?: string
}>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

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

const { loadingIds } = storeToRefs(useVisibilityStore());
const { checkCode, checkName, checkPhoneNumber } = useFieldValidation();

const isUpdateMode = computed(() => !!props.driverId);

const rules: Record<string, Rule[]> = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  driver_code: [{ validator: checkCode, trigger: ['blur', 'change'] }],
  phone: [{ validator: checkPhoneNumber, trigger: ['blur', 'change'] }],
  user_id: [{ required: true, message: 'Người sở hữu không được để trống' }],
};

const createUpdateBodyState = reactive<API.CreateUpdDriverRequestBody>({
  name: '',
  driver_code: '',
  address: '',
  phone: '',
  description: '',
  email: '',
  user_id: '',
});

const composeRetailerOption = async (query?: ApiQueryAttr<API.Retailer>) => {
  const rs = await retailerApis.search({ query });
  if (!rs || rs.data.retailers.length === 0) {
    return [];
  }

  return rs.data.retailers;
};

const onValidateSuccess = async () => {
  const rs = isUpdateMode.value
    ? await driverApis.update(props.driverId!, createUpdateBodyState)
    : await driverApis.create(createUpdateBodyState);

  if (!rs) {
    return;
  }
  emits('success');
};

const init = async () => {
  if (!props.driverId) {
    return;
  }
  const res = await driverApis.getDetails(props.driverId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.driver_code = res?.data?.driver_code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.phone = res?.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
  createUpdateBodyState.user_id = res?.data?.user_id ?? '';
};
init();
</script>
