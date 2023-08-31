import { RequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const groupDriverApis = {
  search: (params: ApiQuery<GroupDriver>) => {
    return request<PageResponse<SearchGroupDriverResponse>>({
      url: '/core/driver',
      method: RequestMethod.GET,
      params,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  create: (rqBody: CreateGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };
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
    return request<GetGroupDriverDetailResponse>({
      url: `/core/driver${driverId}`,
      method: RequestMethod.GET,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  update: (driverId: string, rqBody: UpdateGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };
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
