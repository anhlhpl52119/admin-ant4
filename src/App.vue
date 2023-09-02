<template>
  <AConfigProvider
    :theme="{
      token: {
        // colorPrimary: '#2c9674',
      },
    }"
  >
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>
  </AConfigProvider>
</template>

<script lang="ts" setup>

</script>
