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
  LOGIN = 1,
  CURRENT_USER,

  RETAILER_DASHBOARD_TOTAL_INVOICE,
  RETAILER_DASHBOARD_TOTAL_INVOICE_AMOUNT,
  RETAILER_DASHBOARD_TOTAL_COMMISSION,
  RETAILER_DASHBOARD_TOTAL_TRANSACTION_AMOUNT,

  BRANCH_SEARCH,
  BRANCH_DETAILS,
  BRANCH_UPDATE,
  BRANCH_CREATE,

  DRIVER_SEARCH,
  DRIVER_INDEPENDENT_SEARCH,
  DRIVER_DETAILS,
  DRIVER_UPDATE,
  DRIVER_CREATE,

  GROUP_DRIVER_SEARCH,
  GROUP_DRIVER_DETAILS,
  GROUP_DRIVER_UPDATE,
  GROUP_DRIVER_CREATE,
  GROUP_DRIVER_DELETE,
  GROUP_DRIVER_ADD_DRIVER,

  RETAILER_SEARCH,
  RETAILER_DETAILS,
  RETAILER_UPDATE,
  RETAILER_CREATE,
  RETAILER_TYPES,
  RETAILER_CONFIG,
  RETAILER_CONFIG_UPDATE,
  RETAILER_CHECK_REQUIRE_CONFIG,
  RETAILER_CHECK_REQUIRE_WEBHOOK,
  RETAILER_CHECK_AUTH_CONFIG,

  RETAILER_CONFIG_SEARCH,
  RETAILER_CONFIG_DETAILS,
  RETAILER_CONFIG_CREATE,

  RETAILER_USER_SEARCH,
  RETAILER_USER_DETAILS,
  RETAILER_USER_UPDATE,
  RETAILER_USER_DELETE,

  INVITATION_SEARCH,
  INVITATION_CANCEL,
  INVITATION_CREATE,

  INVOICE_SEARCH,

  TRANSACTION_SEARCH,
  TRANSACTION_CREATE,
  TRANSACTION_CANCEL,
  TRANSACTION_DETAIL,
  TRANSACTION_COMPLETE,

};
