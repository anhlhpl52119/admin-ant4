export {};
declare global {
  type GroupDriver = {
    id: string;
    name: string;
    code: string;
    description: string;
    email: string;
    address: string;
    status: string;
    source: string;
    source_id: string;
    source_created_at: string;
    source_updated_at: string;
    retailer_id: string;
    retailer?: any; //TODO: add retailer
    drivers?: Driver[];
  };

  type SearchGroupDriverResponse = {
    group_drivers: GroupDriver[];
  };

  type GroupDriverRelationship = 'retailer' | 'drivers';

  type GetGroupDriverDetailResponse = ObjectResponse<GroupDriver>;

  type SearchGroupDriverQueryParams = ApiQuery<GroupDriver, GroupDriverRelationship>;

  type CreateGroupDriverRequestBody = {
    name: string;
    code: string;
    description: string;
    email: string;
    address: string;
    retailer_id: string;
  };

  type UpdateGroupDriverRequestBody = {
    name: string;
    code: string;
    description: string;
    email: string;
    address: string;
    retailer_id: string;
  };
}
