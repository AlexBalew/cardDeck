import React, {ChangeEvent, FocusEventHandler, FormEvent, useEffect, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import s from "./login.module.css"
import {PATH} from "../../app/unauthorizedRoutes";
import viewPassword from "../../assets/viewPassword.png"
import hiddenPassword from "../../assets/hiddenPassword.png"
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppStateType} from "../../bll/store";



export const Login = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.login.isLoggedIn);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [rememberMe, setRememberMe] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordType, setPasswordTypeType] = useState('password')
    //отражает состоняие были мы внутри инпута или нет
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
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
        let currentPasswordValue = e.currentTarget.value
        setPassword(currentPasswordValue)
        if(currentPasswordValue.length < 7)  {
            setPasswordError('Password must be more than 6 character')
        } else {
            setPasswordError('')
        }
    }
    const handleCheckbox = () => {
        setRememberMe(!rememberMe)
    }
    const handleShowPassword = () => {
        if (showPassword) {
            setPasswordTypeType('text')
        } else {
            setPasswordTypeType('password')
        }
        setShowPassword(!showPassword)
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(loginTC(email, password, rememberMe))
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


    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

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
                            {(emailDirty || emailError) && <div style={{color: 'red', marginBottom: '5px', fontSize: '12px'}}>{emailError}</div>}
                            <input name="email"
                                   value={email}
                                   type="email"
                                   className={s.formInput}
                                   onChange={handleInputEmail}
                                   onBlur={e => handlerBlur}
                            />
                        </div>

                        <label> {(passwordDirty || passwordError) ? <div style={{color: 'red', marginBottom: '5px', fontSize: '12px'}}> {passwordError}</div> : "Password" } </label>
                        <div className={s.formInputBox}>
                            {/*{(passwordDirty || passwordError) && <div style={{color: 'red', marginBottom: '5px', fontSize: '12px'}}>{passwordError}</div>}*/}
                            <input name="password"
                                   value={password}
                                   type={passwordType}
                                   className={s.formInput}
                                   onChange={handleInputPassword}
                                   onBlur={e => handlerBlur}
                            />
                            <img className={s.inputPasswordView}
                                 src={showPassword ? viewPassword : hiddenPassword}
                                 alt="eye"
                                 onClick={handleShowPassword}/>
                        </div>
                        <div>
                            <input type="checkbox" id="check" className={s.checkbox}
                                   onChange={handleCheckbox}/>
                            <label htmlFor="check" >Remember</label>
                        </div>


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