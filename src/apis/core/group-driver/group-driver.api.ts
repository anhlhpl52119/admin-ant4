import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const groupDriverApis = {
  search: (params: SearchGroupDriverQueryParams) => {
    return request<PageResponse<SearchGroupDriverResponse>>(
      {
        url: '/core/group_driver',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.GROUP_DRIVER_SEARCH,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  create: (rqBody: CreateGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };

    return request(
      {
        url: '/core/group_driver',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.GROUP_DRIVER_CREATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  getDetails: (driverId: string) => {
    return request<GetGroupDriverDetailResponse>(
      {
        url: `/core/group_driver/${driverId}`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.GROUP_DRIVER_DETAILS,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  update: (driverId: string, rqBody: UpdateGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };

    return request<GetDriverDetailResponse>(
      {
        url: `/core/group_driver/${driverId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.GROUP_DRIVER_UPDATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
};
