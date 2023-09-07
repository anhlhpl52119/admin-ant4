<template>
  <h3 class="text-red font-mono ml-40 text-40">Demo Component</h3>
  <div>
    <slot :id="12" name="item" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{ foo: string }>();
defineSlots<{
  default?: (props: { msg: string }) => any;
  item?: (props: { id: number }) => any;
}>();
</script>
