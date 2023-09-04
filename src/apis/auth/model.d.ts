import type { ERole } from "@/enums/common.enum";
import type { AxiosResponse } from "axios";

export { }
declare global {

    type LoginRequestBody = {
        email: string;
        password: string;
        refresh: boolean;
    }

    type UserLogin = {
        status: {
            code: number;
            message: string;
            data: {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    role: ERole;
                }
            }
        }
    }

    type LoginResponse = AxiosResponse<UserLogin>

}

