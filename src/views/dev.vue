<template>
  <main>
    <CInput
      v-model:value="a"
      :maxlength="10"
      accepted-only="text"
      label="This is label from outside"
      placeholder="todo"
    />
    <br>
    <QuantityItemControl v-model:quantity="b" :default="1" />
    <h2>Demo Price</h2>
    <section class="flex-center gap-20">
      <div>
        <!-- <UnitConverionOptions /> -->
      </div>
      <div class="border h-90" />
      <div> <UnitConverionOptions /> </div>
    </section>
    <section class="mt-40">
      <h1 class="text-20">
        Demo Tax
      </h1>
      <pre>{{ itemPrice }}</pre>
    </section>
    <section />
    <AButton @click="fetch">
      testApi
    </AButton>
  </main>
</template>

<script lang="ts" setup>
import { ProductApi } from '@/apis/ecom/product';

const a = ref('');
const b = ref<number>(1);

export interface taxPrice {
  price: number
  quantity: number
  tax: string | null
}
const fetch = async () => {
  const { data } = await ProductApi.getList();
  console.log(data);
};
const itemPrice = reactive<taxPrice>({
  price: 1201212,
  quantity: 1,
  tax: '8%',
});
</script>
