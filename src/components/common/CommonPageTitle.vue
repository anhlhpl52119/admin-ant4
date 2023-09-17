<template>
  <article class="mx-16 my-20 flex-b-center">
    <span class="text-24 font-700">
      {{ title }}
    </span>
    <slot>
      <AButton type="primary" size="large" @click="$emit('onClickAction')">
        {{ actionBtnLabel }}
        <template #icon>
          <PlusOutlined />
        </template>
      </AButton>
      <slot />
    </slot>
  </article>
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
  title: string
  actionBtnLabel: string
}>();

defineEmits<{
  onClickAction: [v: void]
}>();

const { title, actionBtnLabel } = toRefs(props);
</script>
