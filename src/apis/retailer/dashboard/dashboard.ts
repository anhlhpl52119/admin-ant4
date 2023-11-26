import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerDashboardApis = {
  invoices: (body: API.GetDashboardInfoRequestBody) => {
    return request<ApiPageResponse<ApiObjectResponse<any>>>(
      {
        url: '/retailer/dashboard/source_invoice_chart',
        method: ERequestMethod.GET,
        body,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE,
      },
    );
  },
  invoiceAmount: (body: API.GetDashboardInfoRequestBody) => {
    return request<API.GetBranchDetailResponse>(
      {
        url: '/retailer/dashboard/amount_chart',
        body,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
  totalAmountTransaction: (body: any) => {
    return request<API.GetBranchDetailResponse>(
      {
        url: '/retailer/dashboard/total_transaction_amount',
        body,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
};
