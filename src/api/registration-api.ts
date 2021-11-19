import {instance_local, instance_release} from "./api";

export const registApi = {
    register(email: string, password: string) {
        return instance_release.post<{addedUser: {}, error?: string}>(`auth/register`, {email, password}, {})
    }
}