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

    const backError = useSelector<AppStateType, string>((state) => state.registration.backError)
    const isRegistry = useSelector<AppStateType, boolean>((state) => state.registration.isRegistry)
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
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

    if (isRegistry) return <Navigate to='/login'/>

    return <div className={s.mainContainer}>
        <div className={s.formContainer}>
            <div className={s.title}>
                <h2>it-incubator</h2>
                <h2>Sign Up</h2>
            </div>
            <div className={s.form}>

                <form>
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
                                 onClick={handleSubmit}
                                 disabled={appStatus === 'loading'}>
                        Registry
                    </SuperButton>

                    {password !== confirm ?
                        <div style={{color: 'red', marginTop: '5px'}}>{'Passwords don\'t match'}</div> : ''}
                    {backError && <div style={{color: 'red', marginTop: '5px'}}>{backError}</div>}
                </form>
            </div>

        </div>
    </div>
}

