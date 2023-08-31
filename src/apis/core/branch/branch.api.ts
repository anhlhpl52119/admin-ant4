import { RequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const branchApis = {
  search: (params: ApiQuery<Branch>) => {
    return request<PageResponse<SearchBranchResponse>>({
      url: '/core/branch',
      method: RequestMethod.GET,
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
      method: RequestMethod.POST,
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
      method: RequestMethod.GET,
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
      method: RequestMethod.PUT,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
};
