<template>
  <main>
    <div class="gap-16 flex-center">
      <AButton danger type="primary" @click="showAl">
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
      <div>
        <FieldTitle title="Test" required />
        <CInput
          v-model:value="inputv"
          inputCase="upper"
          class="w-200"
          :replaceSymbol="[TEXT_ONLY]"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import CAlertModal from '@/components/core/CAlertModal/CAlertModal.vue';
import { showAsyncAlert } from '@/composable/core/useAsyncAlert';
import { NUMBER_ONLY, TEXT_ONLY } from '@/constants/regex.constant';

const checkBoxState = ref<boolean>(false);
const inputv = ref('');
const showAl = async () => {
  const a = await showAsyncAlert({
    title: 'hihi title',
    content: 'test content',
    severityLevel: 'danger',
  });
  console.log(a);
};
</script>
@/composable/core/useAsyncAlert