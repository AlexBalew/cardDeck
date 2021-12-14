import {instance} from "./api";

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

export interface IUserData {
    name?: string
    avatar?: string | ArrayBuffer | null
}

export const loginAPI = {
    authMe() {
        return instance.post<LoginResponseType>('/auth/me', {}, {})
    },
    logOut() {
        return instance.delete<{ info: string, error: string }>('/auth/me', {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe}, {})
            .then(res => res.data)
    },
    changeData(userData: IUserData) {
        return instance.put('auth/me', userData)
    },
}
