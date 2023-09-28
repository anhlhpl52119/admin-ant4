import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerApis = {
  search: (params: API.SearchRetailerQueryParams) => {
    return request<ApiPageResponse<API.SearchRetailerResponse>>(
      {
        url: '/core/retailer',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.RETAILER_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<ApiPageResponse<API.SearchRetailerResponse>>(
      {
        url: '/core/retailer',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.RETAILER_CREATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  getDetails: (retailerId: string) => {
    return request<API.GetRetailerDetailResponse>(
      {
        url: `/core/retailer/${retailerId}`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DETAILS,
      },
    );
  },
  update: (retailerId: string, rqBody: API.UpdateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<API.GetRetailerDetailResponse>(
      {
        url: `/core/retailer/${retailerId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.RETAILER_UPDATE,
        successMsg: COMMON_SUCCESS_MSG.update,
        errorMsg: COMMON_ERROR_MSG.update,
        isShowLoading: true,
      },
    );
  },
};
