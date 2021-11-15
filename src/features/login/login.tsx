import React from "react";
import s from "./login.module.css"

type LoginPropsType = {}

export const Login = (props: LoginPropsType) => {
    return (
        <div className={s.loginContainer}>
            <div className={s.formBlock}>
                <div className={s.content}>
                    <h3 className={s.fromBlockTitle}>It-incubator</h3>
                    <form className={s.formContent}>
                        <label>Email</label>
                            <div className={s.formEmailInput}>
                                <input type="email" autoComplete="email"/>
                            </div>

                        <label>Password</label>
                            <div className={s.formPasswordInput}>
                                <input type="password" />
                            </div>

                        <label><input type="checkbox"/>Remember</label>

                        <div className={s.formButtonBlock}>
                            <button className={s.btn}>LOGIN</button>

                            <p className={s.formBlockText}>Forgot password?
                                <a className={s.formLink} href="#">Click Here</a></p>
                            <p className={s.formBlockText}>Don't have an account
                                <a className={s.formLink} href="#">Sign up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}