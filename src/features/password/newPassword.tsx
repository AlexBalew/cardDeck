import React, {ChangeEvent, useState} from "react";
import {setNewPasswordTC} from "./password-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from "./passwordRestore.module.css";
import {AppStateType} from "../../bll/store";
import {Navigate, useParams} from "react-router-dom";
import {RequestStatusType} from "../../app/app-reducer";
import SuperInput from "../../common/elements/input/SuperInput";
import SuperButton from "../../common/elements/button/SuperButton";
import {Nullable} from "../../types";


export const NewPassword = () => {

    let dispatch = useDispatch()
    let requestStatus = useSelector<AppStateType, boolean>(state => state.password.isSuccessfulRequest)
    let appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    let error = useSelector<AppStateType, Nullable<string>>(state => state.password.error)

    const {token} = useParams<'token'>();

    const [value, setValue] = useState<string>('')

    const onSetNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setValue(value)
    }

    const onSendNewPassword = () => {
        dispatch(setNewPasswordTC(value, token!))
    }

    if (requestStatus) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                Set new password, please
                <div className={s.inputGroup}>
                    <div className={s.input}>
                        <SuperInput type='password'
                                    name='newPassword'
                                    placeholder='new password'
                                    onChange={onSetNewPassword}
                                    style={{border: '1px solid black'}}
                        />
                    </div>
                    <div>
                        <SuperButton name='sendCurrentEmail'
                                     onClick={onSendNewPassword}
                                     disabled={appStatus === 'loading'}
                        >Send
                        </SuperButton>
                    </div>
                    {error && <div style={{color: 'red', marginTop: '5px'}}>{error}</div>}
                </div>
            </div>
        </div>
    )
}