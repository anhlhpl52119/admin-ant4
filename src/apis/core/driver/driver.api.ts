import { RequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const driverApis = {
  search: (params: ApiQuery<Driver>) => {
    return request<PageResponse<SearchDriverResponse>>({
      url: '/core/driver',
      method: RequestMethod.GET,
      params,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  create: (rqBody: CreateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };
    return request<PageResponse<SearchDriverResponse>>({
      url: '/core/driver',
      method: RequestMethod.POST,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  getDetails: (driverId: string) => {
    return request<GetDriverDetailResponse>({
      url: `/core/driver${driverId}`,
      method: RequestMethod.GET,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  update: (driverId: string, rqBody: UpdateDriverRequestBody) => {
    const body = { driver: { ...rqBody } };
    return request<GetDriverDetailResponse>({
      url: `/core/driver${driverId}`,
      method: RequestMethod.PUT,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
};
