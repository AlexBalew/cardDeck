import {instance_release} from "./api";

export const restoreAPI = {
    forgot(eMail: string) {
        return instance_release.post<{ info: string, error: string }>('/auth/forgot', {
            email: eMail,
            from: `test-front-admin <${eMail}>`,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/new-password/$token$'>link</a></div>`
        }, {})
    },
    newPassword(newPassword: string, token: string) {
        return instance_release.post<{ info: string, error: string }>('/auth/set-new-password', {
            password: newPassword,
            resetPasswordToken: token
        }, {})
    }
}