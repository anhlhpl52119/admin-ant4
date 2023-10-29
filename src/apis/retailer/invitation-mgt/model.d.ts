import type { EInvitationRelationship } from "@/enums/api.enum";

export {};

declare global {
  namespace API {
    type SearchInvitationResponse = {
      driver_invitations: DriverInvitation[];
    };

    type InvitationRelationship = `${EInvitationRelationship}`;

    type GetInvitationDetailResponse = ApiObjectResponse<DriverInvitation>;

    type SearchInvitationQueryParams = ApiCoreQuery<
    DriverInvitation,
      InvitationRelationship
    >;

    type CreateUpdInvitationRequestBody = {
      driver_id: string;
      group_driver_id: string;
    };
  }
}
