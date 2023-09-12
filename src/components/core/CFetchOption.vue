<template>
  <div :class="labelWhere" class="flex gap-4">
    <span v-if="label" :class="labelClass" class="font-medium">
      {{ label }}
    </span>
    <ASelect
      v-bind="{ ...$attrs }"
      v-model:value="value"
      :options="optionsRef"
      show-search
      placeholder="Tìm theo tên"
      :filter-option="false"
      :loading="isFetching"
      @search="onSearchVal"
      @change="onTest"
    >
      <template v-if="optionsRef.length === 0" #notFoundContent>
        <ASpin v-if="isFetching" size="small" />
        <span v-else> Không tìm thấy hãy thử tìm bằng tên khác</span>
      </template>
    </ASelect>
  </div>
</template>

<script lang="ts" setup generic="T">
import { type DefaultOptionType } from 'ant-design-vue/es/select/index';

type LabelPlacement = 'top' | 'bottom' | 'left' | 'right';
type LabelKeys = keyof T
type ValueKey = keyof T
interface FnParams { keyword?: string; defaultKey: keyof T }

interface CustomProps {
  labelPlacement?: LabelPlacement
  label?: string
  labelClass?: string
  initialValue?: string
  isReadOnly?: boolean
  disabledOptions?: string[]
  requestData: (v: FnParams) => Promise<T[]>
  itemLabelKeys: LabelKeys
  itemValueKey: ValueKey
}
const props = defineProps<CustomProps>();

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

const optionsRef = ref<DefaultOptionType[]>([]);
const isFetching = ref<boolean>(false);
const value = ref('');
const handleChange = async (searchVal?: string) => {
  isFetching.value = true;
  optionsRef.value = [];

  const asdada = searchVal? searchVal : props.
  const fetch = props.requestData;
  const a = await fetch({});
  optionsRef.value = a.map(i => ({
    label: i[props.itemLabelKeys] as string,
    value: i[props.itemValueKey] as string,
  }));
  isFetching.value = false;
};
const onTest = (v: any) => {
};
let timeout: ReturnType<typeof setTimeout>;
const onSearchVal = (val: string) => {
  if (!val) {
    return;
  }
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    handleChange(val);
  }, 600);
};
handleChange();
</script>
