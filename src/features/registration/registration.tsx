import React, {FormEvent, useState} from "react";
import s from "./registration.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {registryTC, setErrorAC} from "./registration-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import SuperButton from "../../common/elements/button/SuperButton";
import SuperInput from "../../common/elements/input/SuperInput";
import viewPassword from "../../assets/password/viewPassword.png";
import hiddenPassword from "../../assets/password/hiddenPassword.png";

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [type, setType] = useState('password')
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [isPasswordEqual, setIsPasswordEqual] = useState<boolean>(false);


    const backError = useSelector<AppStateType, string>((state) => state.registration.backError)
    const isRegistry = useSelector<AppStateType, boolean>((state) => state.registration.isRegistry)
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (confirm !== password) return
        dispatch(registryTC(email, password))
    }

    const onCancelHandle = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        dispatch(setErrorAC(''))
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    const handleShowPassword = () => {
        if (showPassword) {
            setType('text')
        } else {
            setType('password')
        }

        setShowPassword(!showPassword)
    }
    const handlePasswordsMatch = () => {
        (confirm !== password) ? setIsPasswordEqual(true) : setIsPasswordEqual(false)
    }

    if (isRegistry) return <Navigate to='/login'/>

    return <div className={s.mainContainer}>
        <div className={s.formContainer}>
            <div className={s.title}>
                <h2>it-incubator</h2>
                <h2>Sign Up</h2>
            </div>
            <div className={s.form}>

                <form onSubmit={handleSubmit}>
                    <div>Email{<br/>}
                        <SuperInput type={"email"}
                                    value={email}
                                    id={"email"}
                                    onChange={(e) => {
                                        dispatch(setErrorAC(''))
                                        setEmail(e.currentTarget.value)
                                    }}
                                    style={{border: '1px solid black', marginTop: '5px'}}/>
                    </div>

                    <div className={s.password}>Password{<br/>}
                        <SuperInput type={type}
                                    value={password}
                                    id={"password"}
                                    onBlur={handlePasswordsMatch}
                                    onChange={(e) => {
                                        setPassword(e.currentTarget.value)
                                    }}
                                    style={{border: '1px solid black', marginTop: '5px'}}/>
                        <img className={s.passwordControl}
                             src={showPassword ? viewPassword : hiddenPassword}
                             alt="eye"
                             onClick={handleShowPassword}
                        />
                    </div>

                    <div className={s.password}>Confirm password{<br/>}
                        <SuperInput type={type}
                                    value={confirm}
                                    id={confirm}
                                    onBlur={handlePasswordsMatch}
                                    onChange={(e) => {
                                        setConfirm(e.currentTarget.value)
                                    }}
                                    style={{border: '1px solid black', marginTop: '5px'}}/>
                        <img className={s.passwordControl}
                             src={showPassword ? viewPassword : hiddenPassword}
                             alt="eye"
                             onClick={handleShowPassword}
                        />
                    </div>
                    <SuperButton name='sendCurrentEmail'
                                 className={s.btn}
                                 onClick={onCancelHandle}>
                        Cancel
                    </SuperButton>
                    <SuperButton name='sendCurrentEmail'
                                 className={s.btn}
                                 disabled={appStatus === 'loading'}>
                        Registry
                    </SuperButton>

                    {(isPasswordEqual) ?
                        <div style={{color: 'red', marginTop: '5px'}}>{'Passwords don\'t match'}</div> : ''}
                    {backError && <div style={{color: 'red', marginTop: '5px'}}>{backError}</div>}

                </form>
                <div>
                    Have an account? Try to <a className={s.svg} href={'/login'}>log in<svg viewBox="0 0 70 36">
                    <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598
                    11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                </svg></a>
                </div>
            </div>

        </div>
    </div>
}

