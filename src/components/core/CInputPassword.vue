<template>
  <div :class="labelWhere" class="flex gap-4">
    <span v-if="label" :class="labelClass" class="font-medium">
      {{ label }}
    </span>
    <AInputPassword :maxlength="32" v-bind="{ ...$attrs, ...props }" @input="onInput" @keydown="onKeydownHandler" />
  </div>
</template>

<script lang="ts" setup>
import InputProp from 'ant-design-vue/es/input/inputProps';
import type { PropType } from 'vue';

  type RegexTypes = 'password';
  type LabelPlacement = 'top' | 'bottom' | 'left' | 'right'

const props = defineProps({
  ...InputProp(),
  preventKey: Array<string>,
  acceptedOnly: String as PropType<RegexTypes>,
  labelPlacement: String as PropType<LabelPlacement>,
  label: String,
  labelClass: String,
});

const emits = defineEmits<{
  'update:value': [v: string]
}>();

/**
   * define where is label placement base on props
   *
   * @return {string} - class of tailwind
   * */
const labelWhere = computed(() => {
  switch (props.labelPlacement) {
    case 'right':
      return 'flex-row-reverse items-center';
    case 'bottom':
      return 'flex-col-reverse';
    case 'left':
      return 'item-center';
    case 'top':
      return 'flex-col';
    default:
      return 'flex-col';
  }
});

const reRexFactory: { [k in RegexTypes]: (v: string) => string } = {
//   password: (v: string) => v.replace(/^[a-zA-Z0-9]+$/u, ''),
  password: (v: string) => v,
};

/**
   * Trigger when typing on input
   * remove first space character
   *
   * */
const onInput = (e: any) => {
  const firstSpace = /^\s/;
  // remove empty space character ahead of string
  const val = e?.target?.value?.replace(firstSpace, '') ?? '';

  if (!props.acceptedOnly) {
    return emits('update:value', val);
  }
  emits('update:value', reRexFactory[props.acceptedOnly](val));
};
const onKeydownHandler = (e: KeyboardEvent) => {
  if (!props.preventKey || !props.preventKey.includes(e.key)) {
    return;
  }
  e.preventDefault();
};
</script>
