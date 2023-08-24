<template>
  <ASelect
    v-model:value="selectedUnitId"
    style="width: 120px"
    :options="conversionOptions"
  />
  <section mt-25>
    <strong>price {{ vndFormat(itemPrice) }}</strong>
    <strong>priceAfterTax:  {{ vndFormat(priceAfterTax) }}</strong>
    <pre>
      {{ selectedConversion }}
    </pre>

    <QuantityItemControl v-model:quantity="number" :default="1" />
  </section>
</template>

<script setup lang="ts">
import { useConversionOptionPrice } from '@/composable/useConversionOptionPrice';
import { useTaxPrice } from '@/composable/useTaxPrice';
import { product } from '@/dummy/product';
import { vndFormat } from '@/utils/number.util';

const number = ref<number>(2);
const { conversionOptions, itemPrice, selectedConversion, selectedUnitId } = useConversionOptionPrice(product);
const params = computed(() => ({
  price: itemPrice.value,
  tax: product.tax_id_text,
  quantity: number.value,
}));
const { priceAfterTax } = useTaxPrice(params);
</script>
