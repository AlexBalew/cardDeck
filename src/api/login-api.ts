import {instance_local} from "./api";

export const loginAPI = {
    logOut() {
        return instance_local.delete<{ info: string, error: string }>('/auth/me', {})
    }
}