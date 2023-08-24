import { EAxiosMethod } from '@/enums/common.enum';
import { request } from '@/utils/request.util';

const REQUIRED_PARAMS: ApiCoreQuery<ProductItem>['query'] = {
  is_active_eq: true,
  is_hidden_eq: false,
  product_category_id_not_null: true,
  amis_product_category_is_show_eq: true,
};

export const ProductApi = {
  getList: (params: ApiCoreQuery<ProductItem> = {}) => {
    params.query = { ...params.query, ...REQUIRED_PARAMS };
    return request<PageResponse<ProductResponse>>({
      url: '/ecommerce/amis_product',
      method: EAxiosMethod.GET,
      params,
    },
    {
      successMsg: 'fetch thành công',
      isShowLoading: true,
    });
  },

  getDetails: (id: string) => {
    return request<ProductItem>({
      url: `/ecommerce/amis_product/${id}`,
      method: EAxiosMethod.GET,
    },
    {
      successMsg: 'fetch thành công',
      isShowLoading: true,
    });
  },

  getPriceBook: () => {
    return request({
      url: '/ecommerce/amis_product/product_prices',
      method: EAxiosMethod.GET,
    },
    {
      successMsg: 'fetch thành công',
      isShowLoading: true,
    });
  },

  checkExistCodes: (codes: string[]) => {
    return request({
      url: '/ecommerce/amis_product/check_products_exist',
      body: codes,
      method: EAxiosMethod.POST,
    },
    {
      successMsg: 'fetch thành công',
      isShowLoading: true,
    });
  },

};
