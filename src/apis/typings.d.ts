// generate query interface model compatible to Ransack
type RansackQuery<T> = {
    [K in keyof T as `${string & K}${T[K] extends string | null | boolean
    ? "_eq" | "_cont"
    : T[K] extends Date | null
    ? "_lteq" | "_gteq" | "_gt" | "_lt"
    : T[K] extends boolean | null
    ? "_true" | "_false"
    : never}`]: T[K];
} & {
    [key: string]: any;
};

// page query
type ApiPageQuery = {
    items?: number;
    page?: number;
    includes?: string[];
    all?: boolean;
};

type ApiRelationShipQuery<T extends string = string> = {
    includes?: T[]
}

//
type ApiAttributeQuery<T> = Partial<RansackQuery<T>>;

// api response
type PageResponse<T> = {
    message: string[];
    data: T;
    current_page: number;
    total_page: number;
    total_records: number;
};

type ApiQuery<T, P extends string = string> = ApiPageQuery & ApiRelationShipQuery<P> & {
    query?: ApiAttributeQuery<T>;
}
