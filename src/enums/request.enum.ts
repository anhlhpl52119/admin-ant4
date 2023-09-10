export enum ERequestMethod {
  PUT = 'PUT',
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export enum EStatusCode {
  UNAUTHORIZED = 401,
  UNKNOWN = 999,
}
export enum EApiId {
  API1,
  API2,
  BRANCH_SEARCH,
  BRANCH_DETAILS,
  BRANCH_UPDATE,
  BRANCH_CREATE,

  DRIVER_SEARCH,
  DRIVER_DETAILS,
  DRIVER_UPDATE,
  DRIVER_CREATE,

  GROUP_DRIVER_SEARCH,
  GROUP_DRIVER_DETAILS,
  GROUP_DRIVER_UPDATE,
  GROUP_DRIVER_CREATE,

  RETAILER_SEARCH,
  RETAILER_DETAILS,
  RETAILER_UPDATE,
  RETAILER_CREATE,
};
