import type { ERole } from "@/enums/common.enum";
import type { AxiosResponse } from "axios";

export {};
declare global {
  type UserRole = 'sys' | 'manager' | 'user' |  'driver'
  type LoginRequestBody = {
    email: string;
    password: string;
    refresh: boolean;
  };

  type UserLoginInfo = {
    id: string;
    email: string;
    name: string;
    role: ERole;
  };

  type UserLogin = {
    status: {
      code: number;
      message: string;
      data: {
        user: UserLoginInfo;
      };
    };
  };

  type LoginResponse = AxiosResponse<UserLogin>;
}
