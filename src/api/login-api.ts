import { instance } from "./api";


export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    token: string
    error: string
}

export type LoginUserType = {
    email: string
    password: string
    rememberMe: boolean

}

type RegistrationType = {
    addedUser: {}
    error?: string,
}
export interface UserData {
    name?: string
    avatar?: string
}

export const loginApi = {
    authMe() {
        return instance.post<LoginResponseType>('/auth/me', {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe}, {})
    },
    logOut() {
        return instance.delete<LoginResponseType>('/auth/me', {})
    },
    changeData(userData: UserData) {
        return instance.put('auth/me', userData)
    },
    registration(email: string, password: string) {
        return instance.post<RegistrationType>('auth/register', {email, password})
    }
}