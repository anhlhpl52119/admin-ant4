export enum SortOrder {
  DESCEND = 'desc',
  ASCEND = 'asc',
}

export enum ERole {
  ADMIN = 'sys',
  RETAILER_MANAGER = 'manager',
  RETAILER_USER = 'user',
  DRIVER = 'driver',

}

export enum EDateFormat {
  DATE_HOUR_MINUTE = 'DD-MM-YYYY HH:mm',
  DAY_AND_MONTH = 'DD-MM',
  MONTH_AND_YEAR = 'MM-YYYY',
  ONLY_YEAR = 'YYYY',
  ONLY_DAY = 'DD',
  DATE_HOUR_MINUTE_SECOND = 'DD-MM-YYYY HH:mm:ss',
  DATE_API_QUERY = 'DD-MM-YYYY',
  UNIX_TIME = 'X',
  UNIX_TIME_SECOND = 'x',
  HOUR_AND_MINUTES = 'HH:MM',
  MONTH_NAME = 'MMM',
}
