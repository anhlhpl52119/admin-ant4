<template>
  <main>
    <div class="gap-16 flex-center">
      <AButton danger type="primary">
        Error
      </AButton>
      <AButton type="primary">
        Primary Button
      </AButton>
      <AButton danger>
        Danger btn
      </AButton>
      <AButton type="dashed">
        Dashed Button
      </AButton>
      <ACheckbox v-model:checked="checkBoxState">
        Checkbox
      </ACheckbox>
      <i class="i-ph-anchor-simple-thin w30 h30" />
    </div>
  </main>
</template>

<script lang="ts" setup>
const checkBoxState = ref<boolean>(false);
</script>
