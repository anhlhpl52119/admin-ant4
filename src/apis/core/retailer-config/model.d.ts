declare namespace API {
  type RetailerConfig = {
    id: string;
    name: string;
    code: string;
    value: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    retailer_id: string;
    retailer?: Retailer;
  };

  type SearchRetailerConfigResponse = {
    retailer_configs: RetailerConfig[];
  };

  type RetailerConfigRelationship = 'retailer';

  type SearchRetailerConfigQueryParams = ApiCoreQuery<RetailerConfig, RetailerConfigRelationship>;

  type GetRetailerConfigDetailResponse = ApiObjectResponse<RetailerConfig>;

  type CreateRetailerConfigRequestBody = {
    name: string;
    code: string;
    description: string;
    value: string;
    retailer_id: string;
  };

  type UpdateRetailerConfigRequestBody = {
    name: string;
    code: string;
    description: string;
    value: string;
    retailer_id: string;
  };
}
