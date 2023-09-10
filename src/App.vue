<template>
  <AConfigProvider
    :theme="{
      token: {
        colorPrimary: '#4281A4',
        colorSuccess: '#48A9A6',
        colorWarning: '#D4B483',
        colorError: '#C1666B',
      },
    }"
  >
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>
  </AConfigProvider>
</template>

<script lang="ts" setup></script>
