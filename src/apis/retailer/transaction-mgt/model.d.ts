import type { ETransactionStatus } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchTransactionHistoryResponse = {
      transaction_histories: TransactionHistory[];
    };

    type TransactionHistoryRelationship = "source_invoices";

    type SearchTransactionQueryParams = ApiCoreQuery<
      TransactionHistory,
      TransactionHistoryRelationship>;

    type CreateTransactionHistoryRequestBody = {
      transaction_history: {
        tax?: number;
        driver_id: string;
        status: `${ETransactionStatus}`;
        description?: string;
      },
      source_invoice_ids: string[]; //// Lấy source_invoice có stauts = active va transaction_history_id = null
    }
  }
}
