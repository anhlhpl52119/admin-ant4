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
    user_id: string;
    created_at?: Date;
    updated_at?: Date;
    subdomain_api?: string;
    subdomain_fe?: string;
    sync_status: RetailerSyncStatus;
    // relationship
    group_drivers?: GroupDriver[];
    drivers?: Driver[];
    user?: any; // TODO
  };

  type SearchRetailerResponse = {
    retailers: Retailer[];
  };

  type RetailerSyncStatus =
    | "not_config"
    | "ready_to_sync"
    | "synced"
    | "sync_failed"
    | "webhook_not_enough"
    | "full_synced";

  type RetailerRelationship = 
  | "group_drivers" 
  | "drivers" 
  | "user";

  type SearchRetailerQueryParams = ApiCoreQuery<Retailer, RetailerRelationship>;

  type GetRetailerDetailResponse = ApiObjectResponse<Retailer>;

  type CreUpdRetailerRequestBody = {
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    source: string;
    status?: string;
    subdomain_api?: string;
    subdomain_fe?: string;
  };

  type RetailerType = {
    id: string;
    name: string;
    code: string;
    description: string;
    created_at: string;
    updated_at: string;
  };

  type GetRetailerTypesResponse = ApiArrayResponse<RetailerType>;


  type RetailerConfig = {
    id: string;
    name: string;
    code: string;
    value: string;
    description: string;
    created_at?: Date;
    updated_at?: Date;
    retailer_id: string;
  };

  type GetRetailerConfigsResponse = ApiArrayResponse<RetailerConfig>;

  type UpdateRetailerConfigsRequestBody = {
    name: string;
    code: string;
    description: string;
    value: string;
    retailer_id: string;
  };
}
