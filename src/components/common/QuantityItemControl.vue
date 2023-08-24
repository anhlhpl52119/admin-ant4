<template>
  <div class="flex gap-5 items-stretch">
    <AButton
      :disabled="quantityRef <= props.default"
      danger
      @click="change(ChangeType.DECREASE)"
    >
      <template #icon>
        <MinusOutlined />
      </template>
    </AButton>
    <CInput
      v-model:value="custom"
      :maxlength="max"
      :on-blur="onBlur"
      accepted-only="number"
    />
    <AButton
      :disabled="(quantityRef + 1).toString().length > max"
      type="primary"
      @click="change(ChangeType.INCREASE)"
    >
      <template #icon>
        <PlusOutlined />
      </template>
    </AButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
  quantity: number
  default: number
  maxlength?: number
  isFormat?: boolean
}>();

const emits = defineEmits<{
  'update:quantity': [v: number]
}>();

const max = computed(() => {
  return props.maxlength ?? 4;
});

enum ChangeType {
  INCREASE,
  DECREASE,
}

const quantityRef = toRef(props, 'quantity');
const updateQuantity = (v: number) => {
  emits('update:quantity', v);
};

const custom = computed({
  get() {
    return props.quantity;
  },
  set(val) {
    updateQuantity(Number(val));
  },

});

const change = (v: ChangeType) => {
  switch (v) {
    case ChangeType.DECREASE:
      return updateQuantity(props.quantity - 1);
    case ChangeType.INCREASE:
      return updateQuantity(props.quantity + 1);
    default:
      return updateQuantity(props.quantity);
  }
};

const onBlur = () => {
  if (quantityRef.value === 0) {
    updateQuantity(props.default);
  }
};
</script>
