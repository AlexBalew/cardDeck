import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Navigate, NavLink} from "react-router-dom";
import s from "./login.module.css"
import viewPassword from "../../assets/password/viewPassword.png"
import hiddenPassword from "../../assets/password/hiddenPassword.png"
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppStateType} from "../../bll/store";
import {PATH} from "../../app/Routes";




export const Login = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.login.isLoggedIn);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordType, setPasswordTypeType] = useState('password');

    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    //отражает состоняие были мы внутри инпута или нет

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        dispatch(loginTC(email, password, rememberMe))
    }

    const handlerBlur = (e: FormEvent<HTMLInputElement>) => {
        switch (e.currentTarget.value) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }
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

                    <form className={s.formContent} onSubmit={handleSubmit}>
                        <label>{(emailDirty || emailError) ? <div className={s.errorStyle}>{emailError}</div> : 'Email'}</label>
                        <div className={s.formInputBox}>
                            <input name="email"
                                   value={email}
                                   type="email"
                                   className={s.formInput}
                                   onChange={handleInputEmail}
                                   onBlur={handlerBlur}
                            />
                        </div>

                        <label> {(passwordDirty || passwordError) ? <div className={s.errorStyle}> {passwordError}</div> : "Password" } </label>
                        <div className={s.formInputBox}>
                            {/*{(passwordDirty || passwordError) && <div style={{color: 'red', marginBottom: '5px', fontSize: '12px'}}>{passwordError}</div>}*/}
                            <input name="password"
                                   value={password}
                                   type={passwordType}
                                   className={s.formInput}
                                   onChange={handleInputPassword}
                                   onBlur={handlerBlur}
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