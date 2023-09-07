<template>
  <main>
    <div class="text-20">
      Driver
    </div>
    <div class="gap-16 flex-center">
      <AButton danger type="primary" @click="call.search()">
        Test Search Api ...
      </AButton>
      <AButton type="primary">
        Test Api 2
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
      <pre class="mt-30">{{ driver[0] }}</pre>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { driverApis } from '@/apis/core/driver/driver.api';

const checkBoxState = ref<boolean>(false);
const driver = ref<Driver[]>([]);

const call = {
  search: async () => {
    const res = await driverApis.search();
    driver.value = res.data.drivers;
  },
};
</script>
