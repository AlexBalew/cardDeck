import React, {useState} from "react";
import styles from "./registration.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {registryTC, setError} from "./registration-reducer";

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const backError = useSelector<AppStateType, string>((state) => state.registration.backError)
    const isRegistry = useSelector<AppStateType, boolean>((state) => state.registration.isRegistry)

    const dispatch = useDispatch()

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (confirm !== password) {
            return
        }
        dispatch(registryTC(email, password))
    }

    const onCancelHandle = (e: any) => {
        e.preventDefault()

        dispatch(setError(''))
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    if (isRegistry) return <Navigate to='/login'/>

    return <div className={styles.wrapper}>
        <div className={styles.box}>
            <div className={styles.title}>
                <h2>it-incubator</h2>
                <h2>Sign Up</h2>
            </div>
            <div className={styles.form}>

                <form>
                    <label>Email <input type={"email"} value={email} onChange={(e) => {
                        dispatch(setError(''))
                        setEmail(e.currentTarget.value)
                    }}/>
                    </label><br/>
                    <label>Password <input type={"password"} value={password} onChange={(e) => {
                        setPassword(e.currentTarget.value)
                    }}/><br/>
                    </label>
                    <label>Confirm password <input type={"password"} value={confirm} onChange={(e) => {
                        setConfirm(e.currentTarget.value)
                    }}/><br/>
                    </label>
                    <button onClick={onCancelHandle}>Cancel</button>
                    <button onClick={handleSubmit}>Registry</button>

                    {password !== confirm ? <div>{'Passwords don\'t match'}</div> : ''}
                    {backError ? <div>{backError}</div> : ''}
                </form>
            </div>

        </div>
    </div>
}

