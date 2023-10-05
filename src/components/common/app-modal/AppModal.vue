<template>
  <AModal
    :open="visibleModalState.isOpen"
    destroy-on-close
    :title="visibleModalState.modalTitle ?? ''"
    @cancel="closeModal"
  >
    <Component
      :is="visibleModalState.component"
      v-bind="visibleModalState.props"
      v-on="visibleModalState?.emitEvent ?? {}"
    />
    <template #footer>
      <div class="hidden" />
    </template>
  </AModal>
</template>

<script lang="ts" setup>
import { closeModal, visibleModalState } from '@/composable/useAppModal';
</script>
