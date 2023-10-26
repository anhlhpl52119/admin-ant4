export {};

declare global {
  namespace API {
    type Driver = {
      id: string;
      name: string;
      driver_code: string;
      description: string;
      phone: string;
      email: string;
      address: string;
      status: string;
      source: string;
      created_at: Date;
      updated_at: Date;
      user_id: string;
      // relationship
      group_drivers?: GroupDriver[];
      retailers?: Retailer[];
    };

    type GroupDriver = {
      id: string;
      name: string;
      // group_driver_code: string;
      description: string;
      email: string;
      address: string;
      status: string;
      source: string;
      // source_id: string;
      created_at: string;
      updated_at: string;
      retailer_id: string;
      retailer?: Retailer;
      drivers?: Driver[];
    };
  }
}
