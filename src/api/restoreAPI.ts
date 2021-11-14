import axios from "axios";

const settings = {
    withCredentials: true,
}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
})

export const restoreAPI = {
    forgot(value: string) {
        return instance.post<{ info: string, error: string }>('/auth/forgot', {
            email: value,
            from: "test-front-admin <balew48@gmail.com>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        }, {})
    }
}