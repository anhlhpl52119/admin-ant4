import type { AxiosResponse } from "axios";

export { }
declare global {

    type LoginRequestBody = {
        email: string;
        password: string;
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
                }
            }
        }
    }

    type LoginResponse = AxiosResponse<UserLogin>

}

