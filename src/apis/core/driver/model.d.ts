export {};
declare global {
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
    source_id: string;
    source_created_at: string;
    source_updated_at: string;
    user_id: string;
    group_drivers?: GroupDriver[];
    retailer?: Retailer;
  };

  type SearchDriverResponse = {
    drivers: Driver[];
  };
  type DriverRelationShip = 'group_drivers' | 'retailer';

  type SearchDriverQueryParams = ApiQuery<Driver, DriverRelationShip>;

  type GetDriverDetailResponse = ObjectResponse<Driver>
  
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
