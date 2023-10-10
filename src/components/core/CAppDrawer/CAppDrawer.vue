<template>
  <ADrawer
    v-model:open="visible"
    message="toto"
    size="large"
    title="Details"
    placement="right"
    destroyOnClose
  >
    <div class="p-20">
      <!-- <Component :is="drawerComponent" /> -->
    </div>
  </ADrawer>
</template>

<script lang="ts" setup>
const visible = ref(false);
</script>
