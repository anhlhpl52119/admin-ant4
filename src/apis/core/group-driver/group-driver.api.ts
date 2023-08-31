import { ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const groupDriverApis = {
  search: (params: ApiQuery<GroupDriver>) => {
    return request<PageResponse<SearchGroupDriverResponse>>({
      url: '/core/driver',
      method: ERequestMethod.GET,
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
      method: ERequestMethod.POST,
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
      method: ERequestMethod.GET,
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
      method: ERequestMethod.PUT,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
};
