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
        >
          <AFormItem name="name" class="w-full">
            <FieldTitle title="Tên nhà bán lẻ" required>
              <CInput
                v-model:value="createUpdateBodyState.name"
                :maxlength="50"
                placeholder="Nhập tên"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="retailer_code">
            <FieldTitle title="Nhập Mã" required>
              <CInput
                v-model:value="createUpdateBodyState.retailer_code"
                inputCase="upper"
                placeholder="Mã định danh"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="phone" v-bind="naPhoneNumber">
            <FieldTitle title="Số điện thoại" required>
              <CInput
                v-model:value="createUpdateBodyState.phone"
                :maxlength="12"
                placeholder="số điện thoại"
                acceptedOnly="number"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem>
            <FieldTitle title="Địa chỉ" required>
              <CInput
                v-model:value="createUpdateBodyState.address"
                :maxlength="250"
                placeholder="Địa chỉ"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem>
            <FieldTitle title="Mô tả" required>
              <CInput
                v-model:value="createUpdateBodyState.description"
                :maxlength="300"
                placeholder="Mô tả"
              />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="email">
            <FieldTitle title="Nhập email" required>
              <EmailAutoComplete v-model:value="createUpdateBodyState.email" />
            </FieldTitle>
          </AFormItem>
          <AFormItem name="source">
            <FieldTitle title="Chọn Nguồn" required>
              <ASelect
                v-model:value="createUpdateBodyState.source"
                showSearch
                :loading="loadingIds.has(EApiId.RETAILER_TYPES)"
                placeholder="Chọn nguồn"
                :options="options"
                :disabled="loadingIds.has(EApiId.RETAILER_TYPES)"
                :filterOption="filterOption"
              />
            </FieldTitle>
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
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { useCommonStore } from '@/stores/common.store';
import { retailerApis } from '@/apis/sys-admin/retailer-mgt/retailer-mgt';

const props = defineProps<{ retailerId: string }>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadingIds } = storeToRefs(useVisibilityStore());
const { getRetailerTypes } = useCommonStore();
const { checkCode, checkName, checkPhoneNumber, checkEmail } = useFieldValidation();

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

const createUpdateBodyState = reactive<API.CreUpdRetailerRequestBody>({
  name: '',
  retailer_code: '',
  address: '',
  phone: '',
  description: '',
  email: '',
  source: '',
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

const rules: { [k in keyof API.CreUpdRetailerRequestBody]?: Rule[] } = {
  name: [{ validator: checkName, trigger: ['blur', 'change'] }],
  retailer_code: [{ validator: checkCode, trigger: ['blur', 'change'] }],
  phone: [{ validator: checkPhoneNumber, trigger: ['blur'] }],
  email: [{ validator: checkEmail, trigger: 'change' }],
  source: [{ required: true, message: 'Nguồn Không được để trống' }],
};

const options = ref<DefaultOptionType[]>([]);

const isUpdateMode = computed(() => !!props.retailerId);

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
  options.value = types.map(i => ({ value: i.retailer_type_code, label: i.name }));
  if (!(props.retailerId && createUpdateBodyState.source)) {
    createUpdateBodyState.source = options?.value[0]?.value?.toString() ?? '';
  }
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
  createUpdateBodyState.retailer_code = res.data?.retailer_code ?? '';
  createUpdateBodyState.address = res.data?.address ?? '';
  createUpdateBodyState.phone = res.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res.data?.email ?? '';
  createUpdateBodyState.source = res.data?.source ?? '';
};
init();
</script>
