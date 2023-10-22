import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const groupDriverApis = {
  search: (params?: API.SearchInvitationQueryParams) => {
    return request<ApiPageResponse<API.SearchInvitationResponse>>(
      {
        url: 'retailer/driver_invitation',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.INVITATION_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateUpdInvitationRequestBody) => {
    const body = { driver_invitation: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: 'retailer/driver_invitation',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.INVITATION_CREATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  cancel: (inviteId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `retailer/driver_invitation/${inviteId}`,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.INVITATION_CANCEL,
      },
    );
  },

};
