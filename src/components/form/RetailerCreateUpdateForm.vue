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
              acceptedOnly="noSpace"
              upperCase
              withoutDiacritics
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
            <p class="font-medium">
              Nhập email
            </p>
            <!-- <CInput
              v-model:value="createUpdateBodyState.email"
              :maxlength="80"
              label="Email"
            /> -->
            <EmailAutoComplete v-model:value="createUpdateBodyState.email" />
          </AFormItem>
          <AFormItem name="source">
            <p class="font-medium">
              Chọn Nguồn
            </p>
            <ASelect
              v-model:value="createUpdateBodyState.source"
              showSearch
              placeholder="Chọn nguồn"
              :options="options"
              :filterOption="filterOption"
            />
          </AFormItem>
          <div class="flex justify-center gap-10">
            <AButton
              type="primary"
              :loading="loadingIds.has(EApiId.RETAILER_CREATE) || loadingIds.has(EApiId.RETAILER_UPDATE)"
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
import { Form } from 'ant-design-vue';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { useCommonStore } from '@/stores/common.store';

const props = defineProps<{ retailerId: string; sth?: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadingIds } = storeToRefs(useVisibilityStore());
const { getRetailerTypes } = useCommonStore();
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

const createUpdateBodyState = reactive<API.CreateRetailerRequestBody>({
  name: '',
  code: '',
  address: '',
  phone: '',
  description: '',
  email: '',
  source: '',
});

const rules: { [k in keyof API.CreateRetailerRequestBody]?: Rule[] } = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  code: [{ validator: checkCode, trigger: ['blur', 'change'] }],
  phone: [{ validator: checkPhoneNumber, trigger: ['blur', 'change'] }],
  source: [{ required: true, message: 'Nguồn Không được để trống' }],
};

const options = ref<DefaultOptionType[]>([]);

const isUpdateMode = computed(() => !!props.retailerId);

const handleFinishFailed = async (errors: ValidateErrorEntity) => {
// TODO: add scroll to first error field to improve user behavior
};

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().includes(input.toLowerCase()) >= 0;
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

const initOption = async () => {
  const types = await getRetailerTypes();
  if (types.length === 0) {
    return;
  }
  options.value = types.map(i => ({ value: i.code, label: i.name }));
};

const init = async () => {
  initOption();

  if (!props.retailerId) {
    return;
  }

  const res = await retailerApis.getDetails(props.retailerId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res.data?.name ?? '';
  createUpdateBodyState.code = res.data?.code ?? '';
  createUpdateBodyState.address = res.data?.address ?? '';
  createUpdateBodyState.phone = res.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res.data?.email ?? '';
  createUpdateBodyState.source = res.data?.source ?? '';
};
init();
</script>
