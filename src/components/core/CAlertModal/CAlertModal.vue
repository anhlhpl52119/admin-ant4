<template>
  <AModal
    :open="state.isOpen"
    destroyOnClose
    centered
    width="40rem"
    :maskClosable="false"
    :icon="h(ExclamationCircleFilled)"
    :closable="false"
    :keyboard="false"
    class="c-model"
    @cancel="close(false)"
  >
    <template #title>
      <div class="flex items-center gap-10">
        <i class="i-svg:warning block text-30 " />
        <span class="text-18">{{ state.title }}</span>
      </div>
    </template>
    <div>
      <p class="my-20 text-16">
        {{ state.content }}
      </p>
      <ACheckbox v-if="state.strictMsg" v-model:checked="checked">
        Tôi đã đọc và muốn tiếp tục
      </ACheckbox>
    </div>
    <template #footer>
      <AConfigProvider
        :theme="{ token: { colorPrimary: '#faad14' } }"
      >
        <AButton type="primary" :disabled="disabledBtn" @click="close(true)">
          Ok
        </AButton>
        <AButton @click="close(false)">
          Cancel
        </AButton>
      </AConfigProvider>
    </template>
  </AModal>
</template>

<script lang="ts" setup>
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import { closeAlert, confirmAlertState } from '@/composable/core/useCoreAlert';

const state = computed(() => confirmAlertState);

const checked = ref(false);

const disabledBtn = computed(() => {
  if (state.value.strictMsg && !checked.value) {
    return true;
  }

  return false;
});

const close = (isClose: boolean) => {
  checked.value = false;
  closeAlert(isClose);
};
</script>
