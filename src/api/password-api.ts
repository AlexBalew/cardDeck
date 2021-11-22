import {instance_release} from "./api";

export const restoreAPI = {
    forgot(eMail: string) {
        return instance_release.post<{ info: string, error: string }>('/auth/forgot', {
            email: eMail,
            from: `test-front-admin <${eMail}>`,
            message: `<div style="background-color: #C7A5A5; padding: 50px; text-decoration: #3F51B5">password recovery link: <a href='http://localhost:3000/#/new-password/$token$'>Change password</a></div>`
        }, {})
    },
    newPassword(newPassword: string, token: string) {
        return instance_release.post<{ info: string, error: string }>('/auth/set-new-password', {
            password: newPassword,
            resetPasswordToken: token
        }, {})
    }
}