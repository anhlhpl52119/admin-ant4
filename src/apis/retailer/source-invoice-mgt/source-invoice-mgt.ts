import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const invoiceApis = {
  search: (params?: API.SearchSourceInvoiceQueryParams) => {
    return request<ApiPageResponse<API.SearchSourceInvoiceResponse>>(
      {
        url: '/retailer/source_invoice',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.INVOICE_SEARCH,
      },
    );
  },
};
