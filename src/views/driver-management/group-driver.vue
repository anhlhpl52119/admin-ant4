<template>
  <div>group-driver</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  foo: string;
  bar: string;
}>();
const emits = defineEmits<{
  foo: [v: string];
  bar: [v: string];
}>();
</script>
