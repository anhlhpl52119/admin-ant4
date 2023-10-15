// import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
// import { EApiId, ERequestMethod } from '@/enums/request.enum';
// import { request } from '@/utils/request.util';

// export const retailerConfigApis = {
//   search: (params: API.SearchRetailerConfigQueryParams) => {
//     return request<ApiPageResponse<API.SearchRetailerConfigResponse>>(
//       {
//         url: '/core/retailer_config',
//         method: ERequestMethod.GET,
//         params,
//       },
//       {
//         id: EApiId.RETAILER_CONFIG_SEARCH,
//       },
//     );
//   },
//   create: (rqBody: API.CreateRetailerConfigRequestBody) => {
//     const body = { retailer_config: { ...rqBody } };

//     return request<ApiPageResponse<API.SearchRetailerConfigResponse>>(
//       {
//         url: '/core/retailer_config',
//         method: ERequestMethod.POST,
//         body,
//       },
//       {
//         id: EApiId.RETAILER_CONFIG_CREATE,
//         successMsg: COMMON_SUCCESS_MSG.create,
//         errorMsg: COMMON_ERROR_MSG.create,
//         isShowLoading: true,
//       },
//     );
//   },
//   getDetails: (retailerId: string, relationShip?: ApiRelationshipQuery<API.RetailerConfigRelationship>) => {
//     return request<API.GetRetailerConfigDetailResponse>(
//       {
//         url: `/core/retailer_config/${retailerId}`,
//         params: relationShip,
//         method: ERequestMethod.GET,
//       },
//       {
//         id: EApiId.RETAILER_CONFIG_DETAILS,
//       },
//     );
//   },
//   update: (retailerId: string, rqBody: API.UpdateRetailerConfigRequestBody) => {
//     const body = { retailer_config: { ...rqBody } };

//     return request<API.GetRetailerConfigDetailResponse>(
//       {
//         url: `/core/retailer_config/${retailerId}`,
//         method: ERequestMethod.PUT,
//         body,
//       },
//       {
//         id: EApiId.RETAILER_CONFIG_UPDATE,
//         successMsg: COMMON_SUCCESS_MSG.update,
//         errorMsg: COMMON_ERROR_MSG.update,
//         isShowLoading: true,
//       },
//     );
//   },
// };
