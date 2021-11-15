import React, {useState} from "react";
import styles from "./registration.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {registryTC} from "./registration-reducer";

export const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [isMatchPassword, setIsMatchPassword] = useState('')

    const backError = useSelector<AppStateType, string>((state) => state.registration.backError)
    const isRegistry = useSelector<AppStateType, boolean>((state) => state.registration.isRegistry)

    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (confirm !== password) {
            setIsMatchPassword('Passwords don\'t match')
            return
        }
        dispatch(registryTC(email, password))
    }


    const onCancelHandle = () => {
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

                <form onSubmit={handleSubmit}>
                    <label>Email   <input type={"email"} value={email} onChange={(e) => {
                            setEmail(e.currentTarget.value)
                        }}/>
                    </label><br/>
                    <label>Password   <input type={"password"} value={password} onChange={(e) => {
                            setPassword(e.currentTarget.value)
                        }}/><br/>
                    </label>
                    <label>Confirm password   <input type={"password"} value={confirm} onChange={(e) => {
                            setConfirm(e.currentTarget.value)
                        }}/><br/>
                    </label>
                    <input type={"button"} value={'Cancel'} onClick={onCancelHandle}/>
                    <input type={"submit"} value={'Register'}/>

                    {password !== confirm ? <div>{isMatchPassword}</div> : ''}
                    {backError ? <div>{backError}</div> : ''}
                </form>
            </div>

        </div>
    </div>
}

