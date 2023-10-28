import type { EActivationCode, ETransactionStatus } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SourceInvoice = {
      id: string;
      amount: number;
      discount: number;
      tax: number;
      total_amount: number;
      branch_id: string;
      retailer_id: string;
      description: string;
      invoice_date: string;
      status: `${EActivationCode}`;
      source: string;
      created_at: string;
      updated_at: string;
      driver_id: string;
      source_invoice_code?: string;
      commission_rate?: string;
      transaction_history_id?: string;
    };
  }
}