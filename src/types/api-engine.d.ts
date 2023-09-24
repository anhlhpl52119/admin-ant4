import type { AxiosResponse } from "axios";

export {};

declare global {
  /*******__RESPONSE__**********/
  /** Axios Response */
  type ApiRawResponse<T> = AxiosResponse<T>;

  /** Api response with pagination */
  type ApiPageResponse<T> = {
    message: string[];
    data: T & {
      current_page: number;
      total_page: number;
      total_records: number;
    };
  };

  /** Api response with pagination */
  type ApiObjectResponse<T> = {
    message: string[];
    data: T;
  };

  /*******__API-QUERY__**********/
  /** compose query types model compatible to Ransack object */
  type ApiQueryAttr<T> = {
    [K in keyof T as `${string & K}${T[K] extends string | null | boolean
      ? "_eq" | "_cont"
      : T[K] extends Date | null
      ? "_lteq" | "_gteq" | "_gt" | "_lt"
      : T[K] extends boolean | null
      ? "_true" | "_false"
      : never}`]?: T[K];
  } & {
    [key: string]: any;
  };

  /** Query Object relationship */
  type ApiRelationshipQuery<T extends string = string> = {
    includes: T[];
  };

  /** Query Pagination */
  type ApiPaginationQuery = {
    items: number;
    page: number;
  };

  type ApiCoreQuery<T, P extends string = string> = Partial<
    ApiPaginationQuery &
      ApiRelationshipQuery<P> & {
        query: ApiQueryAttr<T>;
      }
  >;
}
