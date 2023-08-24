import { isNumeric } from '@/utils/number.util';

export interface TaxPrice {
  price: number
  quantity: number
  tax: string | null
}

export const useTaxPrice = (taxInfo: Ref<TaxPrice> | ComputedRef<TaxPrice>) => {
  const tax = computed(() => {
    if (!taxInfo.value.tax) {
      return 0;
    }

    const taxParse = taxInfo.value.tax.replace('%', '');
    if (!isNumeric(taxParse)) {
      return 0;
    }

    return Number(taxParse);
  });

  const displayTax = computed(() => {
    if (tax.value === 0) {
      return 'Không tính thuế';
    }

    return `${tax.value}%`;
  });

  const priceTax = computed(() => {
    if (tax.value === 0) {
      return 0;
    }

    const taxPrice = taxInfo.value.price * tax.value / 100 * taxInfo.value.quantity;
    return Math.round(taxPrice);
  });

  const priceBeforeTax = computed(() => {
    if (taxInfo.value.price === 0) {
      return 0;
    }

    return Math.round(taxInfo.value.price * taxInfo.value.quantity);
  });

  const priceAfterTax = computed(() => {
    if (taxInfo.value.price === 0) {
      return 0;
    }

    const rs = Math.round((taxInfo.value.price * taxInfo.value.quantity) + priceTax.value);
    return Math.round(rs);
  });
  return {
    tax,
    displayTax,
    priceTax,
    priceBeforeTax,
    priceAfterTax,
  };
};
