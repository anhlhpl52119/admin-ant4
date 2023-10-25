<template>
  <template v-for="(value, id) in state" :key="id">
    <AModal
      :open="value.isOpen"
      destroyOnClose
      centered
      :footer="null"
      :width="value.modalWidth"
      :maskClosable="value.maskCloseable ?? false"
      :title="value.headerTitle ?? ''"
      @cancel="coreModal.close(id.toString())"
    >
      <Component
        :is="value.component"
        v-bind="value?.props ?? {}"
        v-on="value?.event ?? {}"
      />
    </AModal>
  </template>
</template>

<script lang="ts" setup>
const state = computed(() => Object.fromEntries(modalState));
</script>
