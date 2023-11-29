import type { Dayjs } from 'dayjs';
import { invoiceApis } from '@/apis/retailer/source-invoice-mgt/source-invoice-mgt';
import { transactionHistoryApis } from '@/apis/retailer/transaction-mgt/transaction-mgt';
import { formatDate, isValidDate } from '@/utils/date.util';
import { EDateFormat } from '@/enums/common.enum';
import type { ETransactionStatus } from '@/enums/api.enum';

type DriverInvoiceType = 'unpaid' | 'all';
type DateOrder = 'desc' | 'asc'
interface DriverInvoiceQuery {
  driverId: string
  invoiceType: DriverInvoiceType
  page?: number
  items?: number
  dateOrder?: DateOrder
  range?: [Dayjs, Dayjs]
}

interface DriverTransactionQuery {
  driverId: string
  transactionStatus: `${ETransactionStatus}`
  page?: number
  items?: number
  dateOrder?: DateOrder
  range?: [Dayjs, Dayjs]
}

interface DriverInvoicesResponse {
  currentPage: number
  totalRecord: number
  totalPage: number
  sourceInvoices: API.SourceInvoice[]
}

interface DriverTransactionResponse {
  currentPage: number
  totalRecord: number
  totalPage: number
  transactionHistories: API.TransactionHistory[]
}

const FALL_BACK_DRIVER_INVOICES_RESPONSE = {
  sourceInvoices: [],
  totalPage: 1,
  currentPage: 1,
  totalRecord: 0,
};

const FALL_BACK_DRIVER_TRANSACTION_RESPONSE = {
  transactionHistories: [],
  totalPage: 1,
  currentPage: 1,
  totalRecord: 0,
};

export const useDriverCache = () => {
  const getDriverInvoices = async (props: DriverInvoiceQuery): Promise<DriverInvoicesResponse> => {
    if (!props.driverId) {
      return FALL_BACK_DRIVER_INVOICES_RESPONSE;
    }

    const query: API.SearchSourceInvoiceQueryParams['query'] = {
      driver_id_eq: props.driverId,
      s: `invoice_date ${props?.dateOrder || 'desc'}`,
      status_eq: 'active',
      transaction_history_id_null: 'true',
    };

    const fromDate = props?.range?.[0] || undefined;
    const toDate = props?.range?.[1] || undefined;
    // query date order
    if (fromDate && toDate && isValidDate(fromDate) && isValidDate(toDate)) {
      Object.assign(query, {
        invoice_date_gteq: formatDate(fromDate, EDateFormat.DATE_API_QUERY),
        invoice_date_lteq: formatDate(toDate, EDateFormat.DATE_API_QUERY),
      });
    }

    const apiPayload: API.SearchSourceInvoiceQueryParams = {
      items: props?.items || 10,
      page: props?.page || 1,
      query,
    };
    // fetch API
    const rs = await invoiceApis.search(apiPayload);

    // fallback case
    if (!rs?.data?.source_invoices) {
      return FALL_BACK_DRIVER_INVOICES_RESPONSE;
    }

    // success case
    return {
      sourceInvoices: rs?.data?.source_invoices || [],
      totalPage: rs?.data?.total_page || 1,
      currentPage: rs?.data?.current_page || 1,
      totalRecord: rs?.data?.total_records || 0,
    };
  };

  const countDriverInvoices = async (driverId: string, type: DriverInvoiceType = 'all'): Promise<number> => {
    const query: API.SearchSourceInvoiceQueryParams['query'] = {
      driver_id_eq: driverId,
      status_eq: 'active',
    };
    if (type === 'unpaid') {
      Object.assign(query, { transaction_history_id_null: 'true' });
    }
    const rs = await invoiceApis.search({
      items: 1,
      query,
    });
    if (!(rs?.data?.total_records)) {
      return 0;
    }
    return rs?.data?.total_records;
  };

  const countDriverTransactions = async (driverId: string, status?: `${ETransactionStatus}`): Promise<number> => {
    const rs = await transactionHistoryApis.search({
      items: 1,
      query: {
        driver_id_eq: driverId,
        status_eq: status,
      },
    });
    if (!(rs?.data?.total_records)) {
      return 0;
    }
    return rs?.data?.total_records;
  };

  const getDriverTransactions = async (props: DriverTransactionQuery): Promise<DriverTransactionResponse> => {
    if (!props.driverId) {
      return FALL_BACK_DRIVER_TRANSACTION_RESPONSE;
    }
    const query: API.SearchTransactionQueryParams['query'] = {
      driver_id_eq: props.driverId,
      s: `transaction_date ${props?.dateOrder || 'desc'}`,
      status_eq: props?.transactionStatus,
    };

    const fromDate = props?.range?.[0] || undefined;
    const toDate = props?.range?.[1] || undefined;

    // query date order
    if (fromDate && toDate && isValidDate(fromDate) && isValidDate(toDate)) {
      Object.assign(query, {
        transaction_date_gteq: formatDate(fromDate, EDateFormat.DATE_API_QUERY),
        transaction_date_lteq: formatDate(toDate, EDateFormat.DATE_API_QUERY),
      });
    }

    const apiPayload: API.SearchTransactionQueryParams = {
      items: props?.items || 20,
      page: props?.page || 1,
      query,
    };
    // fetch API
    const rs = await transactionHistoryApis.search(apiPayload);

    // fallback case
    if (!rs?.data?.transaction_histories) {
      return FALL_BACK_DRIVER_TRANSACTION_RESPONSE;
    }

    // success case
    return {
      transactionHistories: rs?.data?.transaction_histories || [],
      totalPage: rs?.data?.total_page || 1,
      currentPage: rs?.data?.current_page || 1,
      totalRecord: rs?.data?.total_records || 0,
    };
  };
  return {
    // invoice
    getDriverInvoices,
    countDriverInvoices,
    // transaction
    getDriverTransactions,
    countDriverTransactions,
  };
};
