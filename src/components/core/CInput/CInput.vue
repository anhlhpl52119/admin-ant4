<template>
  <div :class="labelWhere" class="flex gap-4">
    <span v-if="label" :class="labelClass" class="font-medium">
      {{ label }}
    </span>
    <AInputPassword
      v-if="password"
      :maxlength="50"
      v-bind="{ ...$attrs, ...props }"
      @input="onInput"
    />
    <AInput v-else :maxlength="50" v-bind="{ ...$attrs, ...props }" @input="onInput">
      <template v-for="(_, key) in $slots" #[key]>
        <slot :name="key" />
      </template>
    </AInput>
  </div>
</template>

<script lang="ts" setup>
import InputProp from 'ant-design-vue/es/input/inputProps';
import type { PropType } from 'vue';
import { stringWithoutDiacritics } from '@/utils/common.util';

type RegexTypes = 'number' | 'text' | 'userLogin' | 'noSpace';
type LabelPlacement = 'top' | 'bottom' | 'left' | 'right';

const props = defineProps({
  ...InputProp(),
  preventKey: Array<string>,
  acceptedOnly: String as PropType<RegexTypes>,
  labelPlacement: String as PropType<LabelPlacement>,
  label: String,
  labelClass: String,
  password: Boolean,
  upperCase: Boolean,
  withoutDiacritics: Boolean,
});

const emits = defineEmits<{
  'update:value': [v: string]
}>();

/**
 * define where is label placement base on props
 *
 * @return {string} - class of tailwind
 */
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
  text: (v: string) => v.replace(/[0-9]/g, ''),
  number: (v: string) => v.replace(/[^0-9]/g, ''),
  userLogin: (v: string) => v.replace(/[~!#$%^&*()\-\+=\[\]{}|\\;:'",<>\/?\s]/g, ''),
  noSpace: (v: string) => v.replace(/\s/g, ''),
};

/**
 * Trigger when typing on input
 * remove first space character
 *
 */
const onInput = (e: any) => {
  const firstSpace = /^\s/;

  // prevent empty space character ahead of string
  let val: string = e?.target?.value?.replace(firstSpace, '') ?? '';
  if (props.withoutDiacritics) {
    val = stringWithoutDiacritics(val);
  }
  if (props.acceptedOnly) {
    val = reRexFactory[props.acceptedOnly](val);
  }
  if (props.upperCase) {
    val = val.toUpperCase();
  }

  emits('update:value', val);
};
</script>
