import React, {ChangeEvent, FocusEventHandler, FormEvent, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./login.module.css"
import {PATH} from "../../app/unauthorizedRoutes";
import viewPassword from "../../assets/viewPassword.png"
import hiddenPassword from "../../assets/hiddenPassword.png"
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch} from "react-redux";
import {loginThunk} from "./login-reducer";


export const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [rememberMe, setRememberMe] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('Invalid email address')
    const [passwordError, setPasswordError] = useState('password is Required')
    const [formValid, setFormValid] = useState(false);

    const handleInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if( re.test(String(e.currentTarget.value).toLowerCase())) {
            setEmailError('')
        } else {
            setEmailError('Invalid email address')
        }
    }
    const handleInputPassword = (e: ChangeEvent<HTMLInputElement>) => {

        let currentEmailValue = e.currentTarget.value
        setPassword(currentEmailValue)
        if(currentEmailValue.length < 7)  {
            setPasswordError('password must be more than 3 and less then 8 character')
        } else {
            setPasswordError('')
        }
    }
    const handleCheckbox = () => {
        setRememberMe(!rememberMe)
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(loginThunk(email, password, rememberMe))
    }

    const handlerBlur = (e: FocusEventHandler<HTMLInputElement>) => {
        switch (e.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }
    useEffect(() => {
       if (emailError || passwordError) {
           setFormValid(false)
       } else {
           setFormValid(true)
       }
    }, [emailError, passwordError])

    return (
        <div className={s.loginContainer}>
            <div className={s.formBlock}>
                <div className={s.content}>
                    <h3 className={s.fromBlockTitle}>It-incubator</h3>

                    <form className={s.formContent} onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        <label>Email</label>
                        <div className={s.formInputBox}>
                            {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                            <input name="email"
                                   value={email}
                                   type="email"
                                   className={s.formInput}
                                   onChange={handleInputEmail}
                                   onBlur={e => handlerBlur}
                            />
                        </div>

                        <label>Password</label>
                        <div className={s.formInputBox}>
                            {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                            <input name="password"
                                   value={password}
                                   type="password"
                                   className={s.formInput}
                                   onChange={handleInputPassword}
                                   onBlur={e => handlerBlur}
                            />
                            <img className={s.inputPasswordView}
                                 src={showPassword ? viewPassword : hiddenPassword}
                                 alt="eye"
                                 onClick={handleShowPassword}/>
                        </div>

                        <label><input type="checkbox"
                                      onChange={handleCheckbox}
                        />Remember</label>

                        <div className={s.formButtonBlock}>

                            <SuperButton type="submit"
                                         className={s.btn}
                                         disabled={!formValid}
                            >LOGIN</SuperButton>
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