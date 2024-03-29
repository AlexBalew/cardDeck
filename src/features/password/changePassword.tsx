import React, {ChangeEvent, useState} from "react";
import s from './passwordRestore.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {SuccessfulRequestMessage} from "./successfulRequestMessage";
import {sendCurrentEmailTC} from "./password-reducer";
import {Nullable} from "../../types";
import {RequestStatusType} from "../../app/app-reducer";
import SuperButton from "../../common/elements/button/SuperButton";
import SuperInput from "../../common/elements/input/SuperInput";


export const ChangePassword = React.memo(() => {

    let dispatch = useDispatch()
    let requestStatus = useSelector<AppStateType, boolean>(state => state.password.isSuccessfulRequest)
    let error = useSelector<AppStateType, Nullable<string>>(state => state.password.error)
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
                    Enter your email below and follow the further instructions
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
            </div>
        </div>
    )
})