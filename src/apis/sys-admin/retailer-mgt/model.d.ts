import {
  ERetailerRelationShip,
  ERetailerSyncStatus,
  EKiotVietConfig,
} from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchRetailerResponse = {
      retailers: Retailer[];
    };

    type RetailerRelationship = `${ERetailerRelationShip}`;

    type SearchRetailerQueryParams = ApiCoreQuery<
      Retailer,
      RetailerRelationship
    >;

    type GetRetailerDetailResponse = ApiObjectResponse<Retailer>;

    type CreUpdRetailerRequestBody = {
      name: string;
      retailer_code: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      source: string;
      status?: string;
      subdomain_api?: string;
      subdomain_fe?: string;
    };

    type GetRetailerTypesResponse = ApiArrayResponse<RetailerConfigType>;

    type GetRetailerConfigsResponse = ApiArrayResponse<RetailerConfig>;

    type UpdateRetailerConfigsRequestBody = {
      configs: Array<{
        retailer_config_code: `${EKiotVietConfig}`;
        value: string;
      }>;
    };

    type CheckRequireWebHookResponse = {
      result: boolean;
      missing_configs: string[];
    };

    type CheckRequireConfigResponse = ApiSuccessResponse<{
      result: boolean;
    }>;

    type CheckRetailerAuthConfigResponse = {
      result: boolean;
      missing_configs: string[];
    };
  }
}
