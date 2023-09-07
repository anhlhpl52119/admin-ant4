import { ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const driverApis = {
  search: (params?: SearchDriverQueryParams) => {
    return request<PageResponse<SearchDriverResponse>>(
      {
        url: '/core/driver',
        method: ERequestMethod.GET,
        params,
      },
      {
        successMsg: 'Thành Công',
        isShowLoading: true,
      },
    );
  },
  create: (rqBody: CreateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };

    return request<PageResponse<SearchDriverResponse>>(
      {
        url: '/core/driver',
        method: ERequestMethod.POST,
        body,
      },
      {
        successMsg: 'Thành Công',
        isShowLoading: true,
      },
    );
  },
  getDetails: (driverId: string) => {
    return request<GetDriverDetailResponse>(
      {
        url: `/core/driver${driverId}`,
        method: ERequestMethod.GET,
      },
      {
        successMsg: 'Thành Công',
        isShowLoading: true,
      },
    );
  },
  update: (driverId: string, rqBody: UpdateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };

    return request<GetDriverDetailResponse>(
      {
        url: `/core/driver${driverId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        successMsg: 'Thành Công',
        isShowLoading: true,
      },
    );
  },
};
