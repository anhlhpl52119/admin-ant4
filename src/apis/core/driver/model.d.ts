export {}
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
    }
    type SearchDriverResponse = {
        drivers: Driver[]
    }

    type SearchDriverQueryParams = ApiQuery<Driver>
    
    type GetDriverDetailResponse = {
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
    }
    
    type CreateDriverRequestBody = {
        name: string;
        code: string;
        description: string;
        phone: string;
        email: string;
        address: string;
    }
    
    type UpdateDriverRequestBody = {
        name: string;
        code: string;
        description: string;
        phone: string;
        email: string;
        address: string;
    }
    
}
