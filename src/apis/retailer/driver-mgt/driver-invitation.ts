import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const driverInvitationApis = {
  search: (params?: API.SearchDriverInvitationQueryParams) => {
    return request<ApiPageResponse<API.SearchDriverInvitationResponse>>(
      {
        url: '/retailer/driver_invitation',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.INVITATION_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateDriverInvitationRequestBody) => {
    const body = { driver_invitations: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: '/retailer/driver_invitation',
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
        url: `/retailer/driver_invitation/${inviteId}/cancel`,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.INVITATION_CANCEL,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
};
