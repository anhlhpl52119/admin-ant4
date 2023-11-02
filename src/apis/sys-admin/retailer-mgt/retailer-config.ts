import { ERole } from '@/enums/common.enum';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerConfigApis = {
  getTypeCodes: () => {
    return request<API.GetRetailerTypesResponse>(
      {
        url: '/core/retailer/retailer_type',
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_TYPES,
        permitRoles: [ERole.ADMIN],
      },
    );
  },
  getCurrentConfigs: (retailerId: string) => {
    return request<API.GetRetailerConfigsResponse>(
      {
        url: `/core/retailer/${retailerId}/configs`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_CONFIG,
        permitRoles: [ERole.ADMIN],
      },
    );
  },
  update: (retailerId: string, rqBody: API.UpdateRetailerConfigsRequestBody) => {
    const body = { retailer_config: rqBody };

    return request<ApiSuccessResponse>(
      {
        url: `/core/retailer/${retailerId}/update_retailer_config`,
        method: ERequestMethod.PATCH,
        body,
      },
      {
        id: EApiId.RETAILER_CONFIG_UPDATE,
        permitRoles: [ERole.ADMIN],
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
        permitRoles: [ERole.ADMIN],
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
        permitRoles: [ERole.ADMIN],
      },
    );
  },
  checkAuthConnection: (retailerId: string) => {
    return request<API.CheckRetailerAuthConfigResponse>(
      {
        url: `/core/retailer/${retailerId}/auth_retailer`,
        method: ERequestMethod.POST,
      },
      {
        id: EApiId.RETAILER_CHECK_AUTH_CONFIG,
        permitRoles: [ERole.ADMIN],
      },
    );
  },
};
