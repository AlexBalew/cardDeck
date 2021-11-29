import React, {ChangeEvent, useState} from "react";
import s from './passwordRestore.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {SuccessfulRequestMessage} from "./successfulRequestMessage";
import {sendCurrentEmailTC} from "./password-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import SuperButton from "../../common/elements/button/SuperButton";
import SuperInput from "../../common/elements/input/SuperInput";


export const PasswordRestore = React.memo(() => {

    let dispatch = useDispatch()
    let requestStatus = useSelector<AppStateType, boolean>(state => state.password.isSuccessfulRequest)
    let appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    const [value, setValue] = useState<string>('')

    const onSetCurrentEmail = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setValue(value)
    }
    const onSendCurrentEmail = () => {
        dispatch(sendCurrentEmailTC(value))
    }

    if (requestStatus) {
        return <SuccessfulRequestMessage/>
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                <div>
                    Failed to remember your password?
                </div>
                <div>
                    <SuperInput type='email'
                           name='currentEmail'
                           placeholder='your e-mail'
                           onChange={onSetCurrentEmail}
                           style={{border: '1px solid black'}}
                    />
                </div>
                <div>
                    <SuperButton name='sendCurrentEmail'
                            onClick={onSendCurrentEmail}
                            disabled={appStatus === 'loading'}
                    >Send
                    </SuperButton>
                </div>
                <div>
                    Remembered password? Try to <a className={s.svg} href={'/login'}>log in<svg viewBox="0 0 70 36">
                    <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598
                    11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                </svg></a>
                </div>
            </div>
        </div>
    )
})