import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerApis = {
  search: (params?: API.SearchRetailerQueryParams) => {
    return request<ApiPageResponse<API.SearchRetailerResponse>>(
      {
        url: '/core/retailer',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.RETAILER_SEARCH,
        permitRoles: ['sys'],
      },
    );
  },
  getDetails: (retailerId: string, relationShip?: ApiRelationshipQuery<API.RetailerRelationship>) => {
    return request<API.GetRetailerDetailResponse>(
      {
        url: `/core/retailer/${retailerId}`,
        params: relationShip,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DETAILS,
        permitRoles: ['sys'],
      },
    );
  },
  create: (rqBody: API.CreUpdRetailerRequestBody) => {
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
        permitRoles: ['sys'],
      },
    );
  },
  update: (retailerId: string, rqBody: API.CreUpdRetailerRequestBody) => {
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
        permitRoles: ['sys'],
      },
    );
  },
  getTypes: () => {
    return request<API.GetRetailerTypesResponse>(
      {
        url: '/core/retailer/retailer_type',
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_TYPES,
        permitRoles: ['sys'],
      },
    );
  },
  getConfigs: (retailerId: string) => {
    return request<API.GetRetailerConfigsResponse>(
      {
        url: `/core/retailer/${retailerId}/configs`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_CONFIG,
        permitRoles: ['sys'],
      },
    );
  },
  updateConfigs: (retailerId: string, rqBody: API.UpdateRetailerConfigsRequestBody) => {
    const body = { retailer_config: rqBody };

    return request<ApiSuccessResponse>(
      {
        url: `/core/retailer/${retailerId}/update_retailer_config`,
        method: ERequestMethod.PATCH,
        body,
      },
      {
        id: EApiId.RETAILER_CONFIG_UPDATE,
        permitRoles: ['sys'],
      },
    );
  },
  checkRequireConfigs: (retailerId: string) => {
    return request<API.CheckRequireConfigResponse>(
      {
        url: `/core/retailer/${retailerId}/check_require_config`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_CHECK_REQUIRE_CONFIG,
        permitRoles: ['sys'],
      },
    );
  },
  checkRequireWebhook: (retailerId: string) => {
    return request<API.CheckRequireWebHookResponse>(
      {
        url: `/core/retailer/${retailerId}/check_require_webhook`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_CHECK_REQUIRE_WEBHOOK,
        permitRoles: ['sys'],
      },
    );
  },
  checkAuthConfig: (retailerId: string) => {
    return request<API.CheckRetailerAuthConfigResponse>(
      {
        url: `/core/retailer/${retailerId}/auth_retailer`,
        method: ERequestMethod.POST,
      },
      {
        id: EApiId.RETAILER_CHECK_AUTH_CONFIG,
        permitRoles: ['sys'],
      },
    );
  },
};
