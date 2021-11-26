import {instance} from "./api";

export const registApi = {
    register(email: string, password: string) {
        return instance.post<{addedUser: {}, error?: string}>(`auth/register`, {email, password}, {})
    }
}