<template>
  <span v-bind="$attrs" class="clickable" @click="onCopy">{{ copyContent }}</span>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';

const props = defineProps<{
  copyContent: string | number
  showIcon?: boolean
}>();

const { copyContent } = toRefs(props);

const onCopy = async () => {
  try {
    await navigator.clipboard.writeText(copyContent.value.toString());
    message.success({ content: `Sao chép: ${copyContent.value}`, duration: 1.2, key: 'msgKey' });
  }
  catch (e) {
    message.error({ content: 'Không thể sao chép', duration: 1.2, key: 'msgKey' });
  }
};
</script>
