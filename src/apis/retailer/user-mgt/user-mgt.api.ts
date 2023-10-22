import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const driverApis = {
  search: (params?: API.SearchRetailerUserQueryParams) => {
    return request<ApiPageResponse<API.SearchRetailerUserResponse>>(
      {
        url: '/retailer/user',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.RETAILER_USER_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateUpdRetailerUserRequestBody) => {
    const body = { user: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: '/retailer/user',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.RETAILER_USER_UPDATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  getDetails: (userId: string, relationShip?: ApiRelationshipQuery<API.RetailerUserRelationship>) => {
    return request<ApiObjectResponse<API.RetailerUser>>(
      {
        url: `/retailer/user/${userId}`,
        params: relationShip,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_USER_DETAILS,
      },
    );
  },
  // update: (driverId: string, rqBody: API.UpdateDriverRequestBody) => {
  //   const body = { driver: { ...rqBody } };

  //   return request<API.GetDriverDetailResponse>(
  //     {
  //       url: `/core/driver/${driverId}`,
  //       method: ERequestMethod.PUT,
  //       body,
  //     },
  //     {
  //       id: EApiId.DRIVER_UPDATE,
  //       successMsg: COMMON_SUCCESS_MSG.update,
  //       errorMsg: COMMON_ERROR_MSG.update,
  //       isShowLoading: true,
  //     },
  //   );
  // },
  delete: (userId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `/retailer/user/${userId}`,
        method: ERequestMethod.DELETE,
      },
      {
        id: EApiId.RETAILER_USER_DELETE,
      },
    );
  },
};
