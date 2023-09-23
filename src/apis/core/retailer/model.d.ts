export {};
declare global {
  type Retailer = {
    id: string;
    name: string;
    code: string;
    phone: string;
    description: string;
    email: string;
    address: string;
    status: string;
    source: string;
    group_drivers?: GroupDriver[];
    drivers?: Driver[];
  };

  type SearchRetailerResponse = {
    retailers: Retailer[];
  };

  type RetailerRelationship = 'group_drivers' | 'drivers';

  type SearchRetailerQueryParams = ApiQuery<Retailer, RetailerRelationship>;

  type GetRetailerDetailResponse = ObjectResponse<Retailer>;

  type CreateRetailerRequestBody = {
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };

  type UpdateRetailerRequestBody = {
    name: string;
    code: string;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
}
