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
  }
}
