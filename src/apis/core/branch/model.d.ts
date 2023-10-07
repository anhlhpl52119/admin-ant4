declare namespace API {
  type Branch = {
    id: string;
    name: string;
    code: string;
    contact_number: string;
    description: string;
    email: string;
    address: string;
    status: string;
    source: string;
    source_id: string;
    retailer_id: string;
    created_at?: Date;
    updated_at?: Date;
    // relationship
    retailer?: Retailer;
  };

  type SearchBranchResponse = {
    branches: Branch[];
  };

  type BranchRelationShip = 'retailer';

  type SearchBranchQueryParams = ApiCoreQuery<Branch, BranchRelationShip>;

  type GetBranchDetailResponse = ApiObjectResponse<Branch>;

  type CreateBranchRequestBody = {
    name: string;
    code: string;
    description: string;
    contact_number: string;
    email: string;
    address: string;
    retailer_id: string;
  };

  type UpdateBranchRequestBody = {
    name: string;
    code: string;
    description: string;
    contact_number: string;
    email: string;
    address: string;
  };
}
