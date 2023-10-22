import { EGroupDriverRelationship } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchGroupDriverResponse = {
      group_drivers: GroupDriver[];
    };

    type GroupDriverRelationship = `${EGroupDriverRelationship}`;

    type GetGroupDriverDetailResponse = ApiObjectResponse<GroupDriver>;

    type SearchGroupDriverQueryParams = ApiCoreQuery<
      GroupDriver,
      GroupDriverRelationship
    >;

    type CreateUpdGroupDriverRequestBody = {
      name: string;
      code?: string;
      description: string;
      email: string;
      address: string;
    };
    type AddDriverToGroupRequestBody = {
      id: string;
    };
  }
}
