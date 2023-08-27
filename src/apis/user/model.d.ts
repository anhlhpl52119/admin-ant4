import type { ERole } from "@/enums/common.enum";

type UserInfo = {
    id: string;
    email?: any;
    username: string;
    last_sign_in_at?: any;
    failed_attempts: number;
    locked_at?: any;
    created_at: string;
    updated_at: string;
    must_change_password: boolean;
    initial_password: string;
    role: ERole;
}