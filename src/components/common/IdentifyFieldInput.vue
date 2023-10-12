<template>
  <AInput
    :value="value"
    v-bind="$attrs"
    :placeholder="placeholder"
    :maxlength="maxlength ?? 20"
    @input="onTyping"
  />
</template>

<script lang="ts" setup>
import { stringWithoutDiacritics } from '@/utils/common.util';

type CaseType = 'upperCase' | 'lowerCase'
type SpaceReplaceWith = 'underline' | 'dot' | 'hyphen'
const props = defineProps<{
  value: string | number
  case?: CaseType
  placeholder?: string
  spaceReplacement?: SpaceReplaceWith
  maxlength?: number
}>();

const emits = defineEmits<{
  'update:value': [v: string]
}>();

const { value } = toRefs(props);

const caseTransform = (str: string, type: CaseType) => {
  switch (type) {
    case 'upperCase':
      return str.toUpperCase();
    case 'lowerCase':
      return str.toLowerCase();
    default:
      return str;
  }
};

const replaceSpace = (str: string, repl: SpaceReplaceWith) => {
  let chars = '';
  switch (repl) {
    case 'dot':
      chars = '.';
      break;
    case 'hyphen':
      chars = '-';
      break;
    case 'underline':
      chars = '_';
      break;
    default:
      break;
  }

  // TODO: refactor
  // replace space char
  str = str.replace(/\s/g, chars);
  // keep 1 character
  str = str.replace(/([_.-])\1+/g, '$1');

  str = str.replace(/[^a-zA-Z0-9\-_.]/g, '');

  return str;
};

/**
 * Trigger when typing on input
 * remove first space character
 *
 */
const onTyping = (inputVal: any) => {
  const firstSpace = /^\s/;

  // first space character ahead of string
  let val: string = inputVal?.target?.value?.replace(firstSpace, '') ?? '';
  val = stringWithoutDiacritics(val);

  if (props.case && val) {
    val = caseTransform(val, props.case);
  }

  if (props.spaceReplacement && val) {
    val = replaceSpace(val, props.spaceReplacement);
  }
  val = val.replace(/\s/g, '');

  emits('update:value', val);
};
</script>
