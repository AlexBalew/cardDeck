import {instance_local} from "./api";

export type AuthMeResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

export const loginAPI = {
    logOut() {
        return instance_local.delete<{ info: string, error: string }>('/auth/me', {})
    },
    authMe() {
        return instance_local.post<AuthMeResponseType>('/auth/me', {}, {})
    }
}