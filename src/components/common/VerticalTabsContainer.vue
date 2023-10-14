<template>
  <div class="vertical-tabs-container">
    <div :class="tabClass">
      <!-- header -->
      <div v-if="$slots.header" class="b-b b-b-abd b-b-solid">
        <slot name="header" />
      </div>
      <!-- tabs -->
      <ul>
        <template v-for="(item, index) in items" :key="item.value">
          <slot name="item" :data="{ item, index, select }">
            <li
              :class="{ 'text-primary font-bold': item.value === modelValue }"
              class="flex flex-center cursor-pointer px-16 py-12"
              @click="select(item.value)"
            >
              <label class="flex-1 cursor-inherit">{{ item.label }}</label>
              <i class="i-tabler:chevron-right h-20 w-20 flex-shrink-0" />
            </li>
          </slot>
        </template>
      </ul>
      <!-- actions -->
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>
    <!-- tab contents -->
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

interface CommonOption {
  value: string
  label: string
}

const props = defineProps({
  items: { type: Array<CommonOption>, required: true },
  modelValue: { type: String, default: '' },
  contentClass: { type: String, default: '' },
  tabClass: { type: String, default: '' },
});
const emit = defineEmits<{
  'update:modelValue': [v: string]
}>();
const { items, modelValue } = toRefs(props);

const select = (value: string) => {
  emit('update:modelValue', value);
};
</script>
