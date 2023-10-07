declare namespace API {
  type Driver = {
    id: string;
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    status: string;
    source: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
    // relationship
    group_drivers?: GroupDriver[];
    retailers?: Retailer[];
  };

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
