<template>
  <div :class="labelWhere" class="flex gap-4">
    <span v-if="label" :class="labelClass" class="font-medium">
      {{ label }}
    </span>
    <ASelect
      v-bind="{ ...$attrs, ...props }"
      :options="optionsRef"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup generic="T">
import { type DefaultOptionType, selectProps } from 'ant-design-vue/es/select/index';
import { debounceFor } from '@/utils/common.util';

type RegexTypes = 'number' | 'text' | 'userLogin';
type LabelPlacement = 'top' | 'bottom' | 'left' | 'right';
type LabelKeys = [keyof T, keyof T] | [keyof T]
type ValueKey = [keyof T]

const props = defineProps({
  ...selectProps(),
  labelPlacement: String as PropType<LabelPlacement>,
  label: String,
  labelClass: String,
  initialValue: String,
  isReadOnly: Boolean,
  disabledOptions: [] as PropType<string[]>,
  delayTime: {
    type: Number,
    default: 600, // 600ms to next fetch
  },
  requestData: {
    type: Function as PropType<(v?: string) => Promise<T[]>>,
    required: true,
  },
  itemLabelKeys: {
    type: [] as PropType<LabelKeys>,
    required: false,
  },
  itemValueKey: {
    type: [] as PropType<ValueKey>,
    required: false,
  },
});

const emits = defineEmits<{
  'update:value': [v: string]
  selected: [v: T]
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
  text: (v: string) => v.replace(/[0-9]/g, ''),
  number: (v: string) => v.replace(/[^0-9]/g, ''),
  userLogin: (v: string) => v.replace(/[~!#$%^&*()\-\+=\[\]{}|\\;:'",<>\/?\s]/g, ''),
};

/**
 * Trigger when typing on input
 * remove first space character
 *
 * */
// const onInput = (e: any) => {
//   const firstSpace = /^\s/;
//   // remove empty space character ahead of string
//   const val = e?.target?.value?.replace(firstSpace, '') ?? '';

//   if (!props.acceptedOnly) {
//     return emits('update:value', val);
//   }
//   emits('update:value', reRexFactory[props.acceptedOnly](val));
// };
const optionsRef = ref<DefaultOptionType[]>([]);
const handleChange = async () => {
  const fetch = props.requestData;
  const a = await fetch();
  optionsRef.value = a.map(i => ({
    label: i[props.itemLabelKeys![0]] as string,
    value: i[props.itemValueKey![0]] as string,
  }));
};
// handleChange();
const init = async () => {
  await debounceFor(handleChange, 400);
};
init();
</script>
