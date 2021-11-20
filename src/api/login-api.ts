import {instance_local, instance_release} from "./api";

export type LoginResponseType = {
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

export type LoginUserType = {
    email: string
    password: string
    rememberMe: boolean

}

export interface UserData {
    name?: string
    avatar?: string
}

export const loginAPI = {
    authMe() {
        return instance_local.post<LoginResponseType>('/auth/me', {}, {})
    },
    logOut() {
        return instance_local.delete<{ info: string, error: string }>('/auth/me', {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance_local.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe}, {})
    },
    changeData(userData: UserData) {
        return instance_local.put('auth/me', userData)
    },
}
