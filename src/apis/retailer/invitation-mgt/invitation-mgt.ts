import { COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerDriverInvitationApis = {
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
  sendInvite: (rqBody: API.CreateUpdInvitationRequestBody) => {
    const body = { driver_invitation: { ...rqBody } };

    return request<ApiSuccessResponse>(
      {
        url: 'retailer/driver_invitation',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.INVITATION_CREATE,
        successMsg: 'Gửi lời mời thành công!',
        errorMsg: 'Gửi lời mời thất bại',
        isShowLoading: true,
      },
    );
  },
  cancelInvite: (inviteId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `retailer/driver_invitation/${inviteId}/cancel`,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.INVITATION_CANCEL,
        isShowLoading: true,
        successMsg: 'Hủy thành công!',
      },
    );
  },

};
