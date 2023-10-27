// import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
// import { EApiId, ERequestMethod } from '@/enums/request.enum';
// import { request } from '@/utils/request.util';

// export const groupDriverApis = {
//   search: (params?: API.SearchGroupDriverQueryParams) => {
//     return request<ApiPageResponse<API.SearchGroupDriverResponse>>(
//       {
//         url: '/core/group_driver',
//         method: ERequestMethod.GET,
//         params,
//       },
//       {
//         id: EApiId.GROUP_DRIVER_SEARCH,
//       },
//     );
//   },
//   create: (rqBody: API.CreateGroupDriverRequestBody) => {
//     const body = { group_driver: { ...rqBody } };

//     return request(
//       {
//         url: '/core/group_driver',
//         method: ERequestMethod.POST,
//         body,
//       },
//       {
//         id: EApiId.GROUP_DRIVER_CREATE,
//         successMsg: COMMON_SUCCESS_MSG.create,
//         errorMsg: COMMON_ERROR_MSG.create,
//         isShowLoading: true,
//       },
//     );
//   },
//   getDetails: (driverId: string) => {
//     return request<API.GetGroupDriverDetailResponse>(
//       {
//         url: `/core/group_driver/${driverId}`,
//         method: ERequestMethod.GET,
//       },
//       {
//         id: EApiId.GROUP_DRIVER_DETAILS,
//       },
//     );
//   },
//   update: (driverId: string, rqBody: API.UpdateGroupDriverRequestBody) => {
//     const body = { group_driver: { ...rqBody } };

//     return request<API.GetDriverDetailResponse>(
//       {
//         url: `/core/group_driver/${driverId}`,
//         method: ERequestMethod.PUT,
//         body,
//       },
//       {
//         id: EApiId.GROUP_DRIVER_UPDATE,
//         successMsg: COMMON_SUCCESS_MSG.update,
//         errorMsg: COMMON_ERROR_MSG.update,
//         isShowLoading: true,
//       },
//     );
//   },
// };
