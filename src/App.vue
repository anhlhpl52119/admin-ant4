<template>
  <AConfigProvider
    :theme="{
      token: {
        // colorPrimary: '#2c9674',
      },
    }"
  >
    <Transition
      name="fade-transform"
      mode="out-in"
      appear
    >
      <RouterView v-slot="{ Component }">
        <Component :is="Component" />
      </RouterView>
    </Transition>
  </AConfigProvider>
</template>

<script lang="ts" setup>

</script>
