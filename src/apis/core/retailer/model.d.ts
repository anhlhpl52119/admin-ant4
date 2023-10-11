declare namespace API {
  type Retailer = {
    id: string;
    name: string;
    code: string;
    phone: string;
    description: string;
    email: string;
    address: string;
    status: string;
    source: string;
    created_at?: Date;
    updated_at?: Date;
    subdomain_api?: string;
    subdomain_fe?: string;
    // relationship
    group_drivers?: GroupDriver[];
    drivers?: Driver[];
  };

  type SearchRetailerResponse = {
    retailers: Retailer[];
  };

  type RetailerRelationship = 'group_drivers' | 'drivers';

  type SearchRetailerQueryParams = ApiCoreQuery<Retailer, RetailerRelationship>;

  type GetRetailerDetailResponse = ApiObjectResponse<Retailer>;

  type CreateRetailerRequestBody = {
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    source: string;
  };

  type UpdateRetailerRequestBody = {
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    source: string;
  };

  type RetailerType = {
    id: string;
    name: string;
    code: string;
    description: string;
    created_at: string;
    updated_at: string;
  }

  type GetRetailerTypesResponse = ApiArrayResponse<RetailerType>
}
