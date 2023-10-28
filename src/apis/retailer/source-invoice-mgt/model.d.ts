export {};

declare global {
  namespace API {
    type SearchSourceInvoiceResponse = {
      source_invoices: SourceInvoice[];
    };

    type SearchSourceInvoiceQueryParams = ApiCoreQuery<SourceInvoice>;
  }
}
