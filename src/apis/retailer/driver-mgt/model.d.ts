export {};

declare global {
  namespace API {
    type SearchDriverResponse = {
      drivers: Driver[];
    };
    type DriverRelationShip = "group_drivers" | "retailer";

    type SearchDriverQueryParams = ApiCoreQuery<Driver, DriverRelationShip>;

    type GetDriverDetailResponse = ApiObjectResponse<Driver>;

    type CreateDriverRequestBody = {
      name: string;
      code: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      user_id: string;
    };

    type UpdateDriverRequestBody = {
      name: string;
      code: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      user_id: string;
    };
  }
}
