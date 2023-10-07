<template>
  <ADrawer
    v-model:open="isAppDrawerVisible"
    message="toto"
    size="large"
    title="Details"
    placement="right"
    destroyOnClose
  >
    <div class="p-20">
      <Component :is="drawerComponent" />
    </div>
  </ADrawer>
</template>

<script lang="ts" setup>
import { useApplicationStore } from '@/stores/application.store';

const { drawerComponent, isAppDrawerVisible } = storeToRefs(useApplicationStore());
</script>
