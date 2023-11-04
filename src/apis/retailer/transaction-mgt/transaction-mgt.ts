import { COMMON_ERROR_MSG, COMMON_SUCCESS_MSG } from '@/constants/common.constant';
import { EApiId, ERequestMethod } from '@/enums/request.enum';
import { request } from '@/utils/request.util';

export const transactionHistoryApis = {
  search: (params?: API.SearchTransactionQueryParams) => {
    return request<ApiPageResponse<API.SearchTransactionHistoryResponse>>(
      {
        url: '/retailer/transaction_history',
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.TRANSACTION_SEARCH,
      },
    );
  },
  getDetail: (transactionId: string, params?: API.SearchTransactionQueryParams) => {
    return request<ApiObjectResponse<API.TransactionHistory>>(
      {
        url: `/retailer/transaction_history/${transactionId}`,
        method: ERequestMethod.GET,
        params,
      },
      {
        id: EApiId.TRANSACTION_DETAIL,
      },
    );
  },
  create: (body?: API.CreateTransactionHistoryRequestBody) => {
    return request<ApiSuccessResponse>(
      {
        url: '/retailer/transaction_history',
        method: ERequestMethod.POST,
        body,
      },
      {
        id: EApiId.TRANSACTION_CREATE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  cancel: (transactionId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `/retailer/transaction_history/${transactionId}/cancel`,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.TRANSACTION_CANCEL,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
  complete: (transactionId: string) => {
    return request<ApiSuccessResponse>(
      {
        url: `/retailer/transaction_history/${transactionId}/done`,
        method: ERequestMethod.PUT,
      },
      {
        id: EApiId.TRANSACTION_COMPLETE,
        successMsg: COMMON_SUCCESS_MSG.create,
        errorMsg: COMMON_ERROR_MSG.create,
        isShowLoading: true,
      },
    );
  },
};
