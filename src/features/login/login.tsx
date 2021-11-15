import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import s from "./login.module.css"
import {PATH} from "../../app/Routes";
import viewPassword from "../../assets/viewPassword.png"
import hiddenPassword from "../../assets/hiddenPassword.png"
import SuperButton from "../../common/elements/button/SuperButton";


type LoginPropsType = {


}


export const Login = (props: LoginPropsType) => {

    const [show, setShow] = useState(false)

    const handleShowPassword = () => {
        setShow(!show)
    }
    return (
        <div className={s.loginContainer}>
            <div className={s.formBlock}>
                <div className={s.content}>
                    <h3 className={s.fromBlockTitle}>It-incubator</h3>

                    <form className={s.formContent}>
                        <label>Email</label>
                        <div className={s.formInputBox}>
                            <input type="email" className={s.formInput} autoComplete="email"/>
                        </div>

                        <label>Password</label>
                        <div className={s.formInputBox}>
                            <input type="password" className={s.formInput}/>
                            <img className={s.inputPasswordView} src={show ? viewPassword : hiddenPassword} alt="eye" onClick={handleShowPassword}/>
                        </div>

                        <label><input type="checkbox"/>Remember</label>

                        <div className={s.formButtonBlock}>
                            <SuperButton className={s.btn}>LOGIN</SuperButton>
                        </div>
                    </form>

                    <div className={s.textBlock}>
                        <div>
                            <span className={s.formBlockText}>Forgot password?</span>
                            <NavLink to={PATH.RESTORE_PASSWORD} className={s.formLink}>Click Here</NavLink>
                        </div>
                        <div>
                            <span className={s.formBlockText}>Don't have an account</span>
                            <NavLink to={PATH.REGISTRATION} className={s.formLink}>Sign up</NavLink>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}