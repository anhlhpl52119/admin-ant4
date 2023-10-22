import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const groupDriverApis = {
  search: (params?: API.SearchGroupDriverQueryParams) => {
    return request<ApiPageResponse<API.SearchGroupDriverResponse>>(
      {
        url: 'retailer/group_driver',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.GROUP_DRIVER_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateUpdGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: 'retailer/group_driver',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.GROUP_DRIVER_CREATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  getDetails: (groupId: string, relationShip?: ApiRelationshipQuery<API.GroupDriverRelationship>) => {
    return request<API.GetGroupDriverDetailResponse>(
      {
        url: `retailer/group_driver/${groupId}`,
        params: relationShip,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.GROUP_DRIVER_DETAILS,
      },
    );
  },
  update: (groupId: string, rqBody: API.CreateUpdGroupDriverRequestBody) => {
    const body = { group_driver: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: `retailer/group_driver/${groupId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.GROUP_DRIVER_UPDATE,
        successMsg: COMMON_SUCCESS_MSG.update,
        errorMsg: COMMON_ERROR_MSG.update,
        isShowLoading: true,
      },
    );
  },
  delete: (groupId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `retailer/group_driver/${groupId}`,
        method: ERequestMethod.DELETE,
      },
      {
        id: EApiId.GROUP_DRIVER_DELETE,
      },
    );
  },
  addDriver: (groupId: string, rqBody: API.AddDriverToGroupRequestBody) => {
    const body = { driver: rqBody };

    return request<API.GetGroupDriverDetailResponse>(
      {
        url: `retailer/group_driver/${groupId}`,
        body,
        method: ERequestMethod.POST,
      },
      {
        id: EApiId.GROUP_DRIVER_ADD_DRIVER,
      },
    );
  },
};
