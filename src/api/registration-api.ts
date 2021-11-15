import { instance } from "./api";

export const registApi = {
    register(email: string, password: string) {
        return instance.post(`auth/register`, {email, password})
    }
}