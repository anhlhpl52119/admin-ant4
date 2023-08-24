import type { CamelCasedPropertiesDeep, PartialDeep, RequiredDeep, } from "type-fest";

export {};

type RansackQuery<T> = {
    [K in keyof T as `${string & K}${T[K] extends string | null | boolean
    ? '_eq' | '_cont'
    : T[K] extends Date | null
    ? '_lteq' | '_gteq' | '_gt' | '_lt'
    : T[K] extends boolean | null
    ? '_true' | '_false'
    : never}`]: T[K];
} & {
    [key: string]: any;
};
declare global {
    // type-fest utility
    type Camelize<T> = CamelCasedPropertiesDeep<T>;
    type DeepPartial<T> = PartialDeep<T>;
    type DeepRequired<T> = RequiredDeep<T>;

    type PageResponse<T> = {
        message: string[];
        data: T & {
            current_page: number;
            total_page: number;
            total_records: number;
        }
    }
    type PageQuery = {
        items?: number;
        page?: number;
        all?: boolean
    }

    type ApiAttributeQuery<T> = Partial<RansackQuery<T>>

    type ApiCoreQuery<T> = {
        query?: ApiAttributeQuery<T>
    } & PageQuery
}
