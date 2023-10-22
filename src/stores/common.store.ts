import { retailerConfigApis } from '@/apis/sys-admin/retailer-mgt/retailer-config';

export const useCommonStore = defineStore('common-store', () => {
  const retailerTypesState = ref<API.RetailerConfigType[]>([]);

  const getRetailerTypes = async (forceFetch?: boolean) => {
    if (retailerTypesState.value.length > 0 && !forceFetch) {
      return retailerTypesState.value;
    }

    const rs = await retailerConfigApis.getTypeCodes();
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
