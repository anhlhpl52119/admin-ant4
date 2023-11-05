import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerDriverApis = {
  searchMyDrivers: (params?: API.SearchDriverQueryParams) => {
    return request<ApiPageResponse<API.SearchDriverResponse>>(
      {
        url: '/retailer/driver',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.DRIVER_SEARCH,
      },
    );
  },
  searchIndependentDrivers: (params?: API.SearchDriverQueryParams) => {
    return request<ApiPageResponse<API.SearchDriverResponse>>(
      {
        url: '/retailer/driver/unparticipated_drivers',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.DRIVER_INDEPENDENT_SEARCH,
      },
    );
  },
};
