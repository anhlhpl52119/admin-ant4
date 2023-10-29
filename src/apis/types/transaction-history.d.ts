import type { ETransactionStatus } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type TransactionHistory = {
      id: string;
      tax: number;
      total_amount: number;
      driver_id: string;
      retailer_id: string;
      payment_maker_id: string;
      transaction_date: string;
      status: `${ETransactionStatus}`;
      created_at: string;
      updated_at: string;
      transaction_history_code: string;
      description: string;
      // relationship
      source_invoices?: SourceInvoice[];
      driver?: Driver;
    };
  }
}
