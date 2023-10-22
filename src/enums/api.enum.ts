export enum ERetailerRelationShip {
  GROUP_DRIVER = 'group_drivers',
  DRIVER = 'drivers',
  USER = 'user',
}

export enum EGroupDriverRelationship {
  RETAILER = 'retailer',
  DRIVER = 'drivers',
}


export enum ERetailerSyncStatus {
  NOT_CONFIG = 'not_config',
  READY_SYNC = 'ready_to_sync',
  SYNCED = 'synced',
  SYNC_FAILED = 'sync_failed',
  WEBHOOK_NOT_ENOUGH = 'webhook_not_enough',
  FULL_SYNCED = 'full_synced',
}
export enum EKiotVietConfig {
  CONNECTION_NAME = 'KIOTVIET_CONNECTION_NAME',
  CLIENT_ID = 'KIOTVIET_CLIENT_ID',
  SECRET_KEY = 'KIOTVIET_SECRET_KEY',
  SHOP_NAME = 'KIOTVIET_SHOP_NAME',
  PASSWORD = 'KIOTVIET_PASSWORD',
  USERNAME = 'KIOTVIET_USERNAME',
  COMMISSION_RATIO = 'RETAILER_COMMISSION_RATIO',
  ACCESS_TOKEN_PUBLIC_API = 'KIOTVIET_ACCESS_TOKEN_PUBLIC_API',
  ACCESS_TOKEN_PRIVATE_API = 'KIOTVIET_ACCESS_TOKEN_PRIVATE_API',
  COOKIE = 'KIOTVIET_COOKIE',
}
