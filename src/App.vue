<template>
  <AConfigProvider
    :theme="{
      token: {
        colorPrimary: '#2c9674',
      },
    }"
  >
    <RouterView />
  </AConfigProvider>
</template>

<script lang="ts" setup>

</script>
