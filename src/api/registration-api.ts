import {instance_local} from "./api";

export const registApi = {
    register(email: string, password: string) {
        return instance_local.post<{addedUser: {}, error?: string}>(`auth/register`, {email, password}, {})
    }
}