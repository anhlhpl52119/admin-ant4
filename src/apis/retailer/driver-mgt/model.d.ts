export {};

declare global {
  namespace API {
    type SearchDriverResponse = {
      drivers: Driver[];
    };
    type DriverRelationShip = "group_drivers" | "retailer";

    type SearchDriverQueryParams = ApiCoreQuery<Driver, DriverRelationShip>;

    type GetDriverDetailResponse = ApiObjectResponse<Driver>;

    type CreateUpdDriverRequestBody = {
      name: string;
      driver_code: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      user_id: string;
    };


    type SearchDriverInvitationResponse = {
      driver_invitations: DriverInvitation[];
    }

    type DriverInvitationRelationship = 'retailer'  | 'driver' | 'group_driver'

    type SearchDriverInvitationQueryParams = ApiCoreQuery<DriverInvitation, DriverInvitationRelationship>;

    type CreateDriverInvitationRequestBody = {
      driver_id: string;
      group_driver_id: string;
    }
  }
}
