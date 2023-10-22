import { ERequestMethod } from "@/enums/request.enum";
export {};

declare global {
  namespace API {
    type SearchBranchResponse = {
      branches: Branch[];
    };

    type BranchRelationShip = "retailer";

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
}
