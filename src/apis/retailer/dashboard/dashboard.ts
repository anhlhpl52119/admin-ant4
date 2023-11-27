import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const retailerDashboardApis = {
  invoicesChart: (body: API.GetDashBoardChartInfoRequestBody) => {
    return request<ApiObjectResponse<Record<string, number>>>(
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
  invoiceAmountChart: (body: API.GetDashBoardChartInfoRequestBody) => {
    return request<ApiObjectResponse<Record<string, number>>>(
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
  commissionAmountChart: (body: API.GetDashBoardChartInfoRequestBody) => {
    return request<ApiObjectResponse<Record<string, string>>>(
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
  totalAmountTransaction: (body: API.GetDashBoardTotalAmountRequestBody) => {
    return request<ApiObjectResponse<string>>(
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
  topDriverTotalAmount: (body: API.GetDashBoardTotalAmountRequestBody) => {
    return request<ApiObjectResponse<string>>(
      {
        url: '/retailer/dashboard/top_driver_by_total_amount',
        body,
        method: ERequestMethod.GET,
      },
      {
        id: EApiId.RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
      },
    );
  },
};
