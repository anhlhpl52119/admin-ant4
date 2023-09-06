import { ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerApis = {
  search: (params: SearchRetailerQueryParams) => {
    return request<PageResponse<SearchRetailerResponse>>({
      url: '/core/retailer',
      method: ERequestMethod.GET,
      params,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  create: (rqBody: CreateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<PageResponse<SearchRetailerResponse>>({
      url: '/core/retailer',
      method: ERequestMethod.POST,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  getDetails: (retailerId: string) => {
    return request<GetRetailerDetailResponse>({
      url: `/core/retailer${retailerId}`,
      method: ERequestMethod.GET,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
  update: (retailerId: string, rqBody: UpdateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<GetRetailerDetailResponse>({
      url: `/core/retailer${retailerId}`,
      method: ERequestMethod.PUT,
      body,
    },
    {
      successMsg: 'Thành Công',
      isShowLoading: true,
    });
  },
};
