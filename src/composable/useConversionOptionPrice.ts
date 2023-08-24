import type { SelectProps } from 'ant-design-vue';
import { useCommonStore } from '@/stores/common/common-store';
import { stringToNumber } from '@/utils/number.util';
import { priceBook as price2 } from '@/dummy/product';

interface UnitPrice {
  unitId: number
  unitName: string
  unitPrice: number
}
enum Operator {
  MULTIPLICATION = 1,
  DIVISION = 2,
}
const UNKNOWN_OPTION: UnitPrice = {
  unitId: 999,
  unitName: 'Unknown',
  unitPrice: 0,
};

export const useConversionOptionPrice = (product: ProductItem) => {
  const commonStore = useCommonStore();
  const unitIdMap = reactive<Map<number, UnitPrice>>(new Map());

  const mainProductPrice = ref<UnitPrice>({
    unitId: product?.usage_unit_id ?? UNKNOWN_OPTION.unitId,
    unitName: product?.usage_unit_id_text ?? UNKNOWN_OPTION,
    unitPrice: stringToNumber(product.unit_price),
  });
  const conversions = ref(product?.amis_product_conversions ?? []);

  // option
  const selectedUnitId = ref<number>(mainProductPrice.value.unitId ?? UNKNOWN_OPTION.unitId);
  const selectedConversion = computed(() => unitIdMap.get(selectedUnitId.value) ?? UNKNOWN_OPTION);
  const conversionOptions = computed<SelectProps['options']>(() => [...unitIdMap.values()].map(i => ({ value: i.unitId, label: i.unitName })));
  const itemPrice = computed(() => unitIdMap.get(selectedUnitId.value)?.unitPrice ?? 0);

  const priceConversion = (price: number, op: Operator, rate: number): number => {
    switch (op) {
      case Operator.DIVISION:
        return Math.round(price / rate);
      case Operator.MULTIPLICATION:
        return Math.round(price * rate);
    }
  };

  const stateCalculateOnMainPrice = (mainPrice: number) => {
    if (!(conversions.value.length > 0)) {
      return;
    }
    if (mainPrice === 0) {
      const noZeroItem = conversions.value.find(i => i.conversion_unit_price > 0);
      if (!noZeroItem) {
        conversions.value.forEach((i) => {
          unitIdMap.set(
            i.conversion_unit_id,
            {
              unitId: i.conversion_unit_id,
              unitName: i.conversion_unit_id_text,
              unitPrice: 0,
            });
        });
        return;
      }
      let op: Operator = Operator.DIVISION;
      if (noZeroItem.conversion_operator_id === Operator.DIVISION) {
        op = Operator.MULTIPLICATION;
      }
      const mainPrice = priceConversion(noZeroItem.conversion_unit_price, op, noZeroItem.conversion_rate);
      mainProductPrice.value.unitPrice = mainPrice;
      stateCalculateOnMainPrice(mainPrice);
      return;
    }
    conversions.value.forEach((i) => {
      unitIdMap.set(
        i.conversion_unit_id,
        {
          unitId: i.conversion_unit_id,
          unitName: i.conversion_unit_id_text,
          unitPrice: priceConversion(mainPrice, i.conversion_operator_id, i.conversion_rate),
        });
    });
  };

  const init = () => {
    unitIdMap.set(mainProductPrice.value.unitId, mainProductPrice.value);
    const priceBook = price2[product.product_code];

    if (!priceBook) {
      return stateCalculateOnMainPrice(mainProductPrice.value.unitPrice);
    }

    const unitPriceBook: UnitPrice = {
      unitId: priceBook.product_unit_id,
      unitName: priceBook.product_unit_id_text,
      unitPrice: priceBook.price,
    };
    unitIdMap.set(unitPriceBook.unitId, unitPriceBook);
    return stateCalculateOnMainPrice(unitPriceBook.unitPrice);
  };

  init();
  return {
    conversionOptions,
    selectedUnitId,
    selectedConversion,
    itemPrice,
  };
};
