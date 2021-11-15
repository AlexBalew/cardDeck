import { instance } from "./api";

export const loginAPI = {
    forgot(value: string) {
        return instance.post<{ info: string, error: string }>('/auth/forgot', {
            email: value,
            from: `test-front-admin <${value}>`,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        }, {})
    }
}