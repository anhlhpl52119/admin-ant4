<template>
  <AModal
    :open="visibleModalState.isOpen"
    destroy-on-close
    title="Basic Modal"
    @cancel="closeModal"
  >
    <Component
      :is="visibleModalState.component"
      v-bind="visibleModalState.props"
      v-on="visibleModalState?.emitEvent ?? {}"
    />
  </AModal>
</template>

<script lang="ts" setup>
import { closeModal, visibleModalState } from '@/composable/useAppModal';
</script>
