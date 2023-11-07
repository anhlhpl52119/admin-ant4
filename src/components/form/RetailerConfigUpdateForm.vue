<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadIdsHas([EApiId.RETAILER_CONFIG, EApiId.RETAILER_CONFIG_UPDATE])"
    >
      <AForm
        v-bind="formItemLayout"
        :model="testForm"
        @finish="onValidateSuccess"
      >
        <AFormItem :name="EKiotVietConfig.SHOP_NAME">
          <FieldTitle title="Tên shop" required>
            <CInput
              v-model:value="testForm.KIOTVIET_SHOP_NAME"
              :maxlength="50"
              placeholder="Tên shop"
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.CONNECTION_NAME">
          <FieldTitle title="Tên kết nối" required>
            <CInput
              v-model:value="testForm.KIOTVIET_CONNECTION_NAME"
              :maxlength="50"
              placeholder="Tên kết nối"
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.USERNAME">
          <FieldTitle title="Tên đăng nhập" required>
            <CInput
              v-model:value="testForm.KIOTVIET_USERNAME"
              :maxlength="50"
              acceptedOnly="noSpace"
              placeholder="Tên đăng nhập"
              label=""
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.PASSWORD">
          <FieldTitle title="Mật khẩu" required>
            <CInput
              v-model:value="testForm.KIOTVIET_PASSWORD"
              :maxlength="50"
              placeholder="Mật khẩu"
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.CLIENT_ID">
          <FieldTitle title="Tên client" required>
            <CInput
              v-model:value="testForm.KIOTVIET_CLIENT_ID"
              :maxlength="50"
              placeholder="Tên client"
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.COMMISSION_RATIO">
          <FieldTitle title="Chiết khấu" required>
            <CInput
              v-model:value="testForm.RETAILER_COMMISSION_RATIO"
              :maxlength="50"
              placeholder="Chiết khấu"
            />
          </FieldTitle>
        </AFormItem>
        <AFormItem :name="EKiotVietConfig.SECRET_KEY">
          <FieldTitle title="Secret key" required>
            <CInput
              v-model:value="testForm.KIOTVIET_SECRET_KEY"
              :maxlength="50"
              placeholder="Secret key"
            />
          </FieldTitle>
        </AFormItem>
        <!-- Footer -->
        <div class="flex justify-center gap-10">
          <AButton
            type="primary"
            :loading="loadIdsHas(EApiId.RETAILER_CONFIG_UPDATE)"
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
    </ASpin>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { EApiId } from '@/enums/request.enum';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { EKiotVietConfig } from '@/enums/api.enum';
import { retailerConfigApis } from '@/apis/sys-admin/retailer-mgt/retailer-config';

const props = defineProps<{
  retailerId: string
  currentConfig?: API.RetailerConfig[]
}>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadIdsHas } = storeToRefs(useLoaderStore());
const { checkName } = useFieldValidation();

// TODO: any name
const testForm = reactive<any>({
  [EKiotVietConfig.CONNECTION_NAME]: '',
  [EKiotVietConfig.SHOP_NAME]: '',
  [EKiotVietConfig.USERNAME]: '',
  [EKiotVietConfig.PASSWORD]: '',
  [EKiotVietConfig.CLIENT_ID]: '',
  [EKiotVietConfig.COMMISSION_RATIO]: '',
  [EKiotVietConfig.SECRET_KEY]: '',
});

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

const configsState = ref<API.RetailerConfig[]>([]);

const updBody = computed<API.UpdateRetailerConfigsRequestBody>(() => {
  const updatebody = Object.entries(testForm).map(([retailer_config_code, value]) => ({ retailer_config_code, value }));

  return {
    configs: updatebody as API.UpdateRetailerConfigsRequestBody['configs'],
  };
});

const rules: { [k in EKiotVietConfig]?: Rule[] } = {
  [EKiotVietConfig.ACCESS_TOKEN_PRIVATE_API]: [{ validator: checkName, trigger: ['blur', 'change'] }],
};

const onValidateSuccess = async () => {
  if (!props.retailerId) {
    return;
  }

  // const asd = retailerConfigApis
  const res = await retailerConfigApis.update(props.retailerId, updBody.value);
  if (!res) {
    return;
  }
  emits('success');
};

const init = async () => {
  if (!props.retailerId) {
    return;
  }

  if (props.currentConfig) {
    configsState.value = props.currentConfig;

    return;
  }

  const res = await retailerConfigApis.getCurrentConfigs(props.retailerId);
  if (!(res && res.data)) {
    return;
  }

  const aaa = res.data.reduce((map, obj) => {
    const keys = Object.keys(testForm);
    if (keys.includes(obj.retailer_config_code)) {
      map[obj.retailer_config_code] = obj.value;
    }

    return map;
  }, {} as { [k in EKiotVietConfig]?: string });

  Object.assign(testForm, aaa);
};
init();
</script>
