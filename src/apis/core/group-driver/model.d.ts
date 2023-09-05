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
  };

  type SearchGroupDriverResponse = {
    group_driver: GroupDriver[];
  };

  type GroupDriverRelationship = "retailer" | "drivers";
  type GetGroupDriverDetailResponse = GroupDriver;

  type CreateGroupDriverRequestBody = {
    name: string;
    code: string;
    description: string;
    contact_number: string;
    email: string;
    address: string;
  };

  type UpdateGroupDriverRequestBody = {
    name: string;
    code: string;
    description: string;
    contact_number: string;
    email: string;
    address: string;
  };
}
