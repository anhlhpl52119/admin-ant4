import { retailerApis } from '@/apis/core/retailer/retailer.api';

export const useCommonStore = defineStore('common-store', () => {
  const retailerTypesState = ref<API.RetailerConfigType[]>([]);

  const getRetailerTypes = async (forceFetch?: boolean) => {
    if (retailerTypesState.value.length > 0 && !forceFetch) {
      return retailerTypesState.value;
    }
    const rs = await retailerApis.getTypes();
    if (!(rs && rs.data) || rs.data.length === 0) {
      return [];
    }
    retailerTypesState.value = rs.data;

    return rs.data;
  };

  return {
    getRetailerTypes,
  };
});
