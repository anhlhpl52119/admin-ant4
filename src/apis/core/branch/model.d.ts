export { }
declare global {
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
        source_created_at: string;
        source_updated_at: string;
    }
    
    type SearchBranchResponse = {
        drivers: Branch[]
    }

    type GetBranchDetailResponse = Branch

    type CreateBranchRequestBody = {
        name: string;
        code: string;
        description: string;
        contact_number: string;
        email: string;
        address: string;
    }
    
    type UpdateBranchRequestBody = {
        name: string;
        code: string;
        description: string;
        contact_number: string;
        email: string;
        address: string;
    }

}