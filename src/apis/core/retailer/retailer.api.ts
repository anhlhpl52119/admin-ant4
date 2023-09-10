import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerApis = {
  search: (params: SearchRetailerQueryParams) => {
    return request<PageResponse<SearchRetailerResponse>>(
      {
        url: '/core/retailer',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.RETAILER_SEARCH,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  create: (rqBody: CreateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<PageResponse<SearchRetailerResponse>>(
      {
        url: '/core/retailer',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.RETAILER_CREATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  getDetails: (retailerId: string) => {
    return request<GetRetailerDetailResponse>(
      {
        url: `/core/retailer/${retailerId}`,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DETAILS,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
  update: (retailerId: string, rqBody: UpdateRetailerRequestBody) => {
    const body = { retailer: { ...rqBody } };

    return request<GetRetailerDetailResponse>(
      {
        url: `/core/retailer/${retailerId}`,
        method: ERequestMethod.PUT,
        body,
      },
      {
        id: EApiId.RETAILER_UPDATE,
        successMsg: 'Thành Công',
        isShowLoading: false,
      },
    );
  },
};
