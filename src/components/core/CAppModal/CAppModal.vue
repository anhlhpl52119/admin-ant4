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
      @cancel="closeModal(id.toString())"
    >
      <Component
        :is="value.component"
        v-bind="value?.props ?? {}"
        v-on="value?.event ?? {}"
        @cancel="closeModal(id.toString())"
      />
    </AModal>
  </template>
</template>

<script lang="ts" setup>
const state = computed(() => Object.fromEntries(modalState));

const closeModal = (id: string) => {
  coreModal.close(id.toString());
};
</script>
