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
        <!-- Form Items -->
        <template v-for="item in configsState" :key="item.code">
          <AFormItem :name="item.code" :rules="rules[item.code] ?? []">
            <p class="font-medium">
              {{ item.name }}
            </p>
            <IdentifyFieldInput
              v-model:value="item.value"
              case="lowerCase"
              :maxlength="40"
              spaceReplacement="hyphen"
              placeholder="..."
            />
          </AFormItem>
        </template>
        <!-- Footer -->
        <div class="flex justify-center gap-10">
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
      <!-- </template> -->
    </ASpin>
  </div>
</template>

<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { useVisibilityStore } from '@/stores/visibility.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';
import { useFieldValidation } from '@/composable/useFieldValidation';

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
