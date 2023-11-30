import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerDashboardApis = {
  invoicesChart: (params: API.GetDashBoardChartInfoRequestParams) => {
    return request<ApiObjectResponse<Record<string, number>>>(
      {
        url: '/retailer/dashboard/source_invoice_chart',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE,
      },
    );
  },
  invoiceAmountChart: (params: API.GetDashBoardChartInfoRequestParams) => {
    return request<ApiObjectResponse<Record<string, number>>>(
      {
        url: '/retailer/dashboard/amount_chart',
        params,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
  commissionAmountChart: (params: API.GetDashBoardChartInfoRequestParams) => {
    return request<ApiObjectResponse<Record<string, string>>>(
      {
        url: '/retailer/dashboard/amount_chart',
        params,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
  totalAmountTransaction: (params: API.GetDashBoardTotalAmountRequestParams) => {
    return request<ApiObjectResponse<string>>(
      {
        url: '/retailer/dashboard/total_transaction_amount',
        params,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
  topDriverTotalAmount: (params: API.GetDashBoardTotalAmountRequestParams) => {
    return request<ApiObjectResponse<string>>(
      {
        url: '/retailer/dashboard/top_driver_by_total_amount',
        params,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
};
