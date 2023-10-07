<template>
  <AModal
    :open="visibleModalState.isOpen"
    destroyOnClose
    centered
    :title="visibleModalState.modalTitle ?? ''"
    @cancel="coreModal.close()"
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
import { coreModal, visibleModalState } from '@/composable/useAppModal';
</script>
