import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const driverApis = {
  search: (params?: API.SearchDriverQueryParams) => {
    return request<ApiPageResponse<API.SearchDriverResponse>>(
      {
        url: '/core/driver',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.DRIVER_SEARCH,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  create: (rqBody: API.CreateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };

    return request<ApiPageResponse<API.SearchDriverResponse>>(
      {
        url: '/core/driver',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.DRIVER_CREATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  getDetails: (driverId: string) => {
    return request<API.GetDriverDetailResponse>(
      {
        url: `/core/driver/${driverId}`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.DRIVER_DETAILS,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  update: (driverId: string, rqBody: API.UpdateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };

    return request<API.GetDriverDetailResponse>(
      {
        url: `/core/driver/${driverId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.DRIVER_UPDATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
};
