import { EGroupDriverRelationship } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchRetailerUserResponse = {
      users: RetailerUser[];
    };

    type RetailerUserRelationship = "belonged_retailer";

    type GetRetailerUserDetailResponse = ApiObjectResponse<RetailerUser>;

    type SearchRetailerUserQueryParams = ApiCoreQuery<
      RetailerUser,
      RetailerUserRelationship
    >;

    type CreateUpdRetailerUserRequestBody = {
      name: string;
      email: string;
      role: string;
      phone: string;
    };
  }
}
