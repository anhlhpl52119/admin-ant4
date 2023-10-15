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

  /** Api response with single Object */
  type ApiObjectResponse<T> = {
    message: string[];
    data: T;
  };

  /** Api response with Array */
  type ApiArrayResponse<T> = {
    message: string[];
    data: T[];
  };

  /** Api response with success or error when delete, update, create */
  type ApiSuccessResponse<T = any> = {
    message: string[];
    data: any;
  };

  /*******__API-QUERY__**********/
  /** compose query types model compatible to Ransack object */
  type ApiQueryAttr<T> = Partial<RansackQuery<T>>;

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
