import type { EInvitationRelationship } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchInvitationResponse = {
      driver_invitations: Invitation[];
    };

    type InvitationRelationship = `${EInvitationRelationship}`;

    type GetInvitationDetailResponse = ApiObjectResponse<Invitation>;

    type SearchInvitationQueryParams = ApiCoreQuery<
      Invitation,
      InvitationRelationship
    >;

    type CreateUpdInvitationRequestBody = {
      driver_id: string;
      group_driver_id: string;
    };
  }
}
