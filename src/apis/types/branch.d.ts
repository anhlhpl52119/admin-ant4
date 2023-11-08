export {};

declare global {
  namespace API {
    type Branch = {
      id: string;
      name: string;
      branch_code: string;
      contact_number: string;
      description: string;
      email: string;
      address: string;
      status: string;
      source: string;
      source_id?: string;
      retailer_id: string;
      created_at?: string;
      updated_at?: string;
      // relationship
      retailer?: Retailer;
    };
  }
}


