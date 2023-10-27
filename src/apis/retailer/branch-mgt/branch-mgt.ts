import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const branchApis = {
  search: (params?: API.SearchBranchQueryParams) => {
    return request<ApiPageResponse<API.SearchBranchResponse>>(
      {
        url: '/retailer/branch',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.BRANCH_SEARCH,
      },
    );
  },
  getDetails: (branchId: string, relationShip?: ApiRelationshipQuery<API.BranchRelationShip>) => {
    return request<API.GetBranchDetailResponse>(
      {
        url: `/retailer/branch/${branchId}`,
        params: relationShip,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.BRANCH_DETAILS,
      },
    );
  },
};
