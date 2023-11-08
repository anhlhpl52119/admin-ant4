<template>
  <p class="mb-3 text-spotlight">
    {{ title }}
    <i v-if="required" class="i-lucide:asterisk inline-block text-12 text-danger" />
  </p>
  <div v-if="$slots">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  required?: boolean
}>();
</script>
