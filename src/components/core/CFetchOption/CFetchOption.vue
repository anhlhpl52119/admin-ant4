<template>
  <div :class="labelPlacement()" class="flex gap-4">
    <span v-if="label" :class="labelClass" class="font-medium">
      {{ label }}
    </span>
    <!-- Select dropdown -->
    <ASelect
      v-bind="{ ...$attrs }"
      v-model:value="selectedVal"
      :options="optionsRef"
      :show-search="true"
      :disabled="isLoadingOnInit"
      :filter-option="false"
      @search="onTypeToSearch"
      @change="$emit('update:initialValue', $event)"
      @focus="onFocus"
    >
      <!-- show loading when input search -->
      <template v-if="optionsRef.length === 0" #notFoundContent>
        <ASpin v-if="isFetching" size="small" />
        <span v-else> Không tìm thấy hãy thử tìm bằng tên khác</span>
      </template>
      <!-- Show icon  -->
      <template #suffixIcon>
        <i v-if="isFetching" class="i-svg-spinners:3-dots-bounce w20 h20 text-primary" />
        <i v-else class="i-material-symbols:arrow-drop-down-circle-outline-rounded w20 h20" />
      </template>
      <template v-if="!va" #dropdownRender="{ menuNode: menu }">
        <VNodes :vnodes="menu" />
        <ADivider style="margin: 4px 0" />
        <div
          style="padding: 4px 8px; cursor: pointer"
          @mousedown="e => e.preventDefault()"
          @click="fetchOptions()"
        >
          <div class="flex gap-5 text-primary">
            <SearchOutlined />
            <span>Tìm kết quả tương tự hoặc nhập để tìm kiếm</span>
          </div>
        </div>
      </template>
    </ASelect>
  </div>
</template>

<script lang="ts" setup generic="T extends Gen">
import { type DefaultOptionType } from 'ant-design-vue/es/select/index';
import { SearchOutlined } from '@ant-design/icons-vue';
import type { Gen, PropTypes } from './types';

const props = defineProps<PropTypes<T>>();

defineEmits<{
  'update:initialValue': [v: string | number]
}>();

let delayOnInput: ReturnType<typeof setTimeout> | null;
let isInitFirstTime: boolean = true;

const { initialValue } = toRefs(props);
const optionsRef = ref<DefaultOptionType[]>([]);
const selectedVal = ref<string | number>();

const isFetching = ref<boolean>(false);
const isLoadingOnInit = computed<boolean>(() => (isFetching.value && isInitFirstTime));

const labelPlacement = () => {
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
};

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const fetchOptions = async (v?: ApiAttributeQuery<T>) => {
  isFetching.value = true;
  optionsRef.value = [];

  const rs = await props.requestData(v);

  if (rs.length === 0) {
    isFetching.value = false;

    return;
  }
  optionsRef.value = rs.map(i => ({
    label: i[props.labelKey] || '',
    value: i.id || '',
  }));
  isFetching.value = false;
  if (isInitFirstTime) {
    isInitFirstTime = false;
  }
};

const va = ref<string>();

const onTypeToSearch = (typingVal: string) => {
  va.value = typingVal;
  if (!typingVal) {
    return;
  }

  if (delayOnInput) {
    clearTimeout(delayOnInput);
  }

  delayOnInput = setTimeout(() => {
    const qr = `${props.labelKey.toString()}_cont`;
    fetchOptions({ [qr]: typingVal } as ApiAttributeQuery<T>);
    delayOnInput = null;
  }, 500);
};

const onFocus = () => {
  isInitFirstTime = false;
  if (isFetching.value) {
    return;
  }
  if (optionsRef.value.length === 0 && !initialValue?.value) {
    fetchOptions();
  }
};

const init = async () => {
  if (initialValue?.value) {
    await fetchOptions({ id_eq: initialValue.value } as any as ApiAttributeQuery<T>);
  }

  if (optionsRef.value[0]?.value) {
    selectedVal.value = optionsRef.value[0].value;
  }
};

watch(initialValue!, () => {
  if (isInitFirstTime) {
    init();
  }
});
init();
</script>
