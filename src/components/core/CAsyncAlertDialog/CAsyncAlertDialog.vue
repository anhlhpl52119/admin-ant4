<template>
  <AModal
    :open="state.isOpen"
    destroyOnClose
    width="40rem"
    :maskClosable="false"
    :icon="h(ExclamationCircleFilled)"
    :closable="false"
    :keyboard="false"
    class="c-model"
    @cancel="close(false)"
  >
    <template #title>
      <div class="flex justify-center">
        <i class="block text-50" :class="iconMap[state?.severity ?? 'warn']" />
      </div>
    </template>
    <div class="text-center my-20 text-16">
      <template v-if="!Array.isArray(state.content)">
        {{ state.content }}
      </template>
      <ul v-else class="grid-center gap-y-7">
        <li v-for="(msg, index) in state.content" :key="index">
          {{ msg }}
        </li>
      </ul>
    </div>
    <ACheckbox v-if="state.strictMsg && state.severity !== 'error'" v-model:checked="isConfirmStrict">
      <span class="text-desc">{{ strictMsg }}</span>
    </ACheckbox>
    <template #footer>
      <div class="flex justify-center gap-10 pt-16">
        <AConfigProvider
          :theme="{ token: { colorPrimary: colorMap[state?.severity ?? 'warn'] } }"
        >
          <AButton type="primary" :disabled="disabledConfirmBtn" @click="close(true)">
            Xác nhận
          </AButton>
          <AButton v-if="state.severity !== 'error'" @click="close(false)">
            Hủy
          </AButton>
        </AConfigProvider>
      </div>
    </template>
  </AModal>
</template>

<script lang="ts" setup>
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { closeAlert, confirmAlertState } from '@/composable/core/useAsyncAlert';

const state = computed(() => confirmAlertState);

const iconMap: Record<string, string> = {
  error: 'i-fluent:error-circle-12-filled text-danger',
  info: 'i-pepicons-pop:info-circle-filled text-info',
  warn: 'i-fluent:shield-error-20-filled text-warning',
  success: 'i-ooui:success text-green',
};

const colorMap: Record<string, string> = {
  error: '#ff4d4f',
  info: '#12a38e',
  warn: '#faad14',
  success: '#12a38e',
};

const isConfirmStrict = ref(false);

const strictMsg = computed(() => {
  if (state.value.strictMsg === true) {
    return 'Tôi đã đọc và muốn tiếp tục';
  }
  return state.value.strictMsg?.toString();
});

const disabledConfirmBtn = computed(() => {
  if (state.value.strictMsg && !isConfirmStrict.value) {
    return true;
  }
  return false;
});

const close = (isClose: boolean) => {
  isConfirmStrict.value = false;
  closeAlert(isClose);
};
</script>
