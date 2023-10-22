export {};

declare global {
  namespace API {
    type Invitation = {
      id: string
      driver_id: string
      retailer_id: string
      group_driver_id: string
      status: string
      response_at?: string
      created_at: string
      updated_at: string
      //relationship
      retailer?: Retailer,
      driver?: Driver,
      group_driver?: GroupDriver
    }
  }
}
