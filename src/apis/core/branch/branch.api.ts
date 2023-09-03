import { ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const branchApis = {
  search: (params?: SearchBranchQueryParams) => {
    return request<PageResponse<SearchBranchResponse>>({
      url: '/core/branch',
      method: ERequestMethod.GET,
      params,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  create: (rqBody: CreateBranchRequestBody) => {
    const body = { branch: { ...rqBody } };

    return request({
      url: '/core/branch',
      method: ERequestMethod.POST,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  getDetails: (branchId: string) => {
    return request<GetBranchDetailResponse>({
      url: `/core/branch${branchId}`,
      method: ERequestMethod.GET,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  update: (branchId: string, rqBody: UpdateBranchRequestBody) => {
    const body = { branch: { ...rqBody } };

    return request({
      url: `/core/branch${branchId}`,
      method: ERequestMethod.PUT,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
};
