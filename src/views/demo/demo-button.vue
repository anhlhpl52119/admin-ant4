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
    <div class="mt-30">
      <CUinput
        v-model:value="inputv"
        inputCase="upper"
        :replaceSymbol="[TEXT_ONLY]"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { NUMBER_ONLY, TEXT_ONLY } from '@/constants/regex.constant';

const checkBoxState = ref<boolean>(false);
const inputv = ref('');
</script>
