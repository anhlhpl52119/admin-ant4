<template>
  <AInput :maxlength="50" v-bind="{ ...$attrs, ...props }" @input="onInput">
    <template v-for="(_, key) in $slots" #[key]>
      <slot :name="key" />
    </template>
  </AInput>
</template>

<script lang="ts" setup>
import InputProp from 'ant-design-vue/es/input/inputProps';
import type { PropType } from 'vue';
import { stringWithoutDiacritics } from '@/utils/common.util';
import { BEGIN_BY_SPACE, INCLUDE_SPACE, MULTIPLE_SPACE_ADJACENT, NO_SCRIPT_INJECTION } from '@/constants/regex.constant';

type InputCase = 'upper' | 'lower' | 'default'
const props = defineProps({
  ...InputProp(),
  replaceSymbol: {
    type: Array<RegExp>,
    required: false,
  },
  inputCase: {
    type: String as PropType<InputCase>,
    default: 'default',
  },
  noDiacritics: Boolean,
  noSpace: Boolean,
});

const emits = defineEmits<{
  'update:value': [v: string]
}>();
const caseChanger = (val: string, caseType: InputCase): string => {
  switch (caseType) {
    case 'lower':
      return val.toLowerCase();
    case 'upper':
      return val.toUpperCase();
    default:
      return val;
  }
};

const onInput = (e: any) => {
  // prevent empty space character ahead of string
  let val: string = e?.target?.value?.replace(NO_SCRIPT_INJECTION, '') ?? '';
  val = val.replace(BEGIN_BY_SPACE, '');
  val = val.replace(MULTIPLE_SPACE_ADJACENT, ' ');
  if (props.inputCase !== 'default') {
    val = caseChanger(val, props.inputCase);
  }
  if (props?.noSpace) {
    val = stringWithoutDiacritics(val);
    val = val.replace(INCLUDE_SPACE, '');
  };
  if (props.noDiacritics) {
    val = stringWithoutDiacritics(val);
  }
  if (props?.replaceSymbol && props?.replaceSymbol.length > 0) {
    props?.replaceSymbol.forEach((i) => {
      try {
        val = val.replace(i, '');
      }
      catch (error) {}
    });
  }

  emits('update:value', val);
};
</script>
