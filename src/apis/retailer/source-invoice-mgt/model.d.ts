export {};

declare global {
  namespace API {
    type SearchSourceInvoiceResponse = {
      source_invoices: SourceInvoice[];
    };

    type SourceInvoiceRelationship = "";

    type SearchSourceInvoiceQueryParams = ApiCoreQuery<
      SourceInvoice,
      SourceInvoiceRelationship
    >;
  }
}
