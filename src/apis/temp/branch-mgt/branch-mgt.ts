import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const branchApis = {
  search: (params?: API.SearchBranchQueryParams) => {
    return request<ApiPageResponse<API.SearchBranchResponse>>(
      {
        url: '/core/branch',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.BRANCH_SEARCH,
      },
    );
  },
  create: (rqBody: API.CreateBranchRequestBody) => {
    const body = { branch: { ...rqBody } };

    return request(
      {
        url: '/core/branch',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.BRANCH_CREATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  getDetails: (branchId: string, relationShip?: ApiRelationshipQuery<API.BranchRelationShip>) => {
    return request<API.GetBranchDetailResponse>(
      {
        url: `/core/branch/${branchId}`,
        params: relationShip,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.BRANCH_DETAILS,
      },
    );
  },
  update: (branchId: string, rqBody: API.UpdateBranchRequestBody) => {
    const body = { branch: { ...rqBody } };

    return request(
      {
        url: `/core/branch/${branchId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.BRANCH_UPDATE,
        successMsg: COMMON_SUCCESS_MSG.update,
        errorMsg: COMMON_ERROR_MSG.update,
        isShowLoading: true,
      },
    );
  },
};
