export {};

declare global {
  namespace API {
    type SearchSourceInvoiceResponse = {
      source_invoices: SourceInvoice[];
    };
    type SourceInvoiceRelationship = 'driver' | 'branch';

    type SearchSourceInvoiceQueryParams = ApiCoreQuery<SourceInvoice, SourceInvoiceRelationship>;
  }
}
