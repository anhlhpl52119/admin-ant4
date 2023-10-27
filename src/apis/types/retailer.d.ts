import {
  ERetailerSyncStatus,
  EKiotVietConfig,
} from "@/enums/api.enum";
import type { ERole } from "@/enums/common.enum";

export {};

declare global {
  namespace API {
    type Retailer = {
      id: string;
      name: string;
      retailer_code: string;
      phone: string;
      description: string;
      email: string;
      address: string;
      status: string;
      source: string;
      user_id: string;
      created_at?: Date;
      updated_at?: Date;
      subdomain_api?: string;
      subdomain_fe?: string;
      sync_status: `${ERetailerSyncStatus}`;
      // relationship
      group_drivers?: GroupDriver[];
      drivers?: Driver[];
      user?: RetailerUser;
    };

    type RetailerUser = {
      id: string;
      email: string;
      created_at: string;
      updated_at: string;
      name: string;
      role: `${ERole}`;
      phone: string;
      default_password?: string;
      default_password_changed_at?: Date;
      belonged_retailer?: Retailer;
    };

    type RetailerConfigType = {
      id: string;
      name: string;
      retailer_type_code: string;
      description: string;
      created_at: string;
      updated_at: string;
    };

    type RetailerConfig = {
      id: string;
      name: string;
      retailer_config_code: `${EKiotVietConfig}`;
      value: string;
      description: string;
      created_at?: string;
      updated_at?: string;
      retailer_id: string;
    };
  }
}
