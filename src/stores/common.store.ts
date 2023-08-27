import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common-store', () => {
  // const productCodePriceBook = new Map<string, ECOM.UserPriceBook>();
  //
  // return {
  //   productCodePriceBook,
  // };
  const productCodePriceBook = new Map<string, ProductPriceBook>();

  // const countPrice = ref(0);
  // const name = ref('Eduardo');
  // const doubleCount = computed(() => count.value * 2);

  // function increment() {
  //   count.value++;
  // }

  return {
    // countPrice,
    productCodePriceBook,
  };
});
