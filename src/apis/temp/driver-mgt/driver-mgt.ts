// import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
// import { EApiId, ERequestMethod } from '@/enums/request.enum';
// import { request } from '@/utils/request.util';

// export const driverApis = {
//   search: (params?: API.SearchDriverQueryParams) => {
//     return request<ApiPageResponse<API.SearchDriverResponse>>(
//       {
//         url: '/core/driver',
//         method: ERequestMethod.GET,
//         params,
//       },
//       {
//         id: EApiId.DRIVER_SEARCH,
//       },
//     );
//   },
//   create: (rqBody: API.CreateDriverRequestBody) => {
//     const body = { driver: { ...rqBody } };

//     return request<ApiPageResponse<API.SearchDriverResponse>>(
//       {
//         url: '/core/driver',
//         method: ERequestMethod.POST,
//         body,
//       },
//       {
//         id: EApiId.DRIVER_CREATE,
//         successMsg: COMMON_SUCCESS_MSG.create,
//         errorMsg: COMMON_ERROR_MSG.create,
//         isShowLoading: true,
//       },
//     );
//   },
//   getDetails: (driverId: string, relationShip?: ApiRelationshipQuery<API.DriverRelationShip>) => {
//     return request<API.GetDriverDetailResponse>(
//       {
//         url: `/core/driver/${driverId}`,
//         params: relationShip,
//         method: ERequestMethod.GET,
//       },
//       {
//         id: EApiId.DRIVER_DETAILS,
//       },
//     );
//   },
//   update: (driverId: string, rqBody: API.UpdateDriverRequestBody) => {
//     const body = { driver: { ...rqBody } };

//     return request<API.GetDriverDetailResponse>(
//       {
//         url: `/core/driver/${driverId}`,
//         method: ERequestMethod.PUT,
//         body,
//       },
//       {
//         id: EApiId.DRIVER_UPDATE,
//         successMsg: COMMON_SUCCESS_MSG.update,
//         errorMsg: COMMON_ERROR_MSG.update,
//         isShowLoading: true,
//       },
//     );
//   },
// };
