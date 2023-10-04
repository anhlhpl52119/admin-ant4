<template>
  <AModal
    v-model:open="openModal"
    destroy-on-close
    title="Basic Modal"
    @ok="handleOk"
  >
    <Component :is="comp" v-bind="bindTest" v-on="vOnTest" />
  </AModal>
</template>

<script lang="ts" setup>
const handleOk = () => {};
</script>
