<template>
  <div class="grid gap-15 mt-16 min-h-400 items-center">
    <ASpin
      size="large"
      tip="Đang tải..."
      :spinning="loadingIds.has(EApiId.RETAILER_CONFIG) || loadingIds.has(EApiId.RETAILER_CONFIG_UPDATE)"
    >
      <AForm
        v-bind="formItemLayout"
        :model="configsState"
        @finish="onValidateSuccess"
      >
        <div class="flex gap-20">
          <!-- Form Items -->
          <section class="flex-1 card">
            <template v-for="item in requiredConfig" :key="item.code">
              <AFormItem :name="item.code" :rules="rules[item.code] ?? []">
                <p class="font-bold">
                  {{ item.name }}
                </p>
                <IdentifyFieldInput
                  v-model:value="item.value"
                  case="lowerCase"
                  :maxlength="40"
                  size="large"
                  placeholder="Nhập..."
                  class="mt-4"
                />
              </AFormItem>
            </template>
          </section>
          <section class="flex-1 card">
            <template v-for="item in webhookConfig" :key="item.code">
              <AFormItem :name="item.code" :rules="rules[item.code] ?? []">
                <p class="font-bold">
                  {{ item.name }}
                </p>
                <IdentifyFieldInput
                  v-model:value="item.value"
                  case="lowerCase"
                  size="large"
                  spaceReplacement="hyphen"
                  :maxlength="40"
                  placeholder="Nhập... "
                  class="mt-4"
                />
              </AFormItem>
            </template>
          </section>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-5 mt-10">
          <AButton
            type="primary"
            :loading="loadingIds.has(EApiId.RETAILER_CONFIG_UPDATE)"
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
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { EKiotVietConfig } from '@/enums/common.enum';

const props = defineProps<{
  retailerId: string
  currentConfig?: API.RetailerConfig[]
}>();

const emits = defineEmits<{
  success: [v?: any]
  cancel: [v?: any]
}>();

const { loadingIds } = storeToRefs(useVisibilityStore());
const { checkName } = useFieldValidation();

const RETAILER_KIOTVIET_REQUIRE_CONFIG: API.KiotVietConfig[] = [
  EKiotVietConfig.CONNECTION_NAME,
  EKiotVietConfig.SHOP_NAME,
  EKiotVietConfig.USERNAME,
  EKiotVietConfig.PASSWORD,
  EKiotVietConfig.SECRET_KEY,
  EKiotVietConfig.CLIENT_ID,
  EKiotVietConfig.COMMISSION_RATIO,
];

const RETAILER_KIOTVIET_WEBHOOK_CONFIG: API.KiotVietConfig[] = [
  EKiotVietConfig.ACCESS_TOKEN_PRIVATE_API,
  EKiotVietConfig.ACCESS_TOKEN_PUBLIC_API,
  EKiotVietConfig.COOKIE,
];

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

const webhookConfig = computed<API.RetailerConfig[]>(() => configsState.value?.filter(i => RETAILER_KIOTVIET_WEBHOOK_CONFIG.includes(i.code)));

const requiredConfig = computed(() => configsState.value?.filter(i => RETAILER_KIOTVIET_REQUIRE_CONFIG.includes(i.code)));

const updBody = computed<API.UpdateRetailerConfigsRequestBody>(() => {
  const config = configsState.value.map(({ code, value }) => ({ code, value }));

  return {
    configs: config,
  };
});

const rules: { [k in API.KiotVietConfig]?: Rule[] } = {
  // [KiotVietConfig.ACCESS_TOKEN_PRIVATE_API]: [{ validator: checkName, trigger: ['blur', 'change'] }],
};

const onValidateSuccess = async () => {
  if (!props.retailerId) {
    return;
  }

  const res = await retailerApis.updateConfigs(props.retailerId, updBody.value);
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

  const res = await retailerApis.getConfigs(props.retailerId);
  if (!(res && res.data)) {
    return;
  }
  configsState.value = res.data;
};
init();
</script>
