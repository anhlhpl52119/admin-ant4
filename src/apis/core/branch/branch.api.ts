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
        successMsg: 'Tải chi nhánh thành công',
        isShowLoading: false,
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
        successMsg: 'Tạo Thành Công',
        isShowLoading: true,
      },
    );
  },
  getDetails: (branchId: string) => {
    return request<API.GetBranchDetailResponse>(
      {
        url: `/core/branch/${branchId}`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.BRANCH_DETAILS,
        isShowLoading: false,
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
        isShowLoading: false,
      },
    );
  },
};
