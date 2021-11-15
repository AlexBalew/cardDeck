import React, {ChangeEvent, useState} from "react";
import {setNewPasswordTC} from "./password-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from "./passwordRestore.module.css";
import {AppStateType} from "../../bll/store";
import {Navigate, useParams} from "react-router-dom";


export const NewPassword = () => {

    let dispatch = useDispatch()
    let requestStatus = useSelector<AppStateType, boolean>(state => state.password.isSuccessfulRequest)

    const {token} = useParams<'token'>();

    const [value, setValue] = useState<string>('')

    const onSetNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setValue(value)
    }

    const onSendNewPassword = () => {
        dispatch(setNewPasswordTC(value, token!))
    }

    if(requestStatus) {
       return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                Set new password, please
                <div>
                    <input type='password'
                           name='newPassword'
                           placeholder='new password'
                           onChange={onSetNewPassword}
                           style={{border: '1px solid black'}}
                    />
                    <button name='sendCurrentEmail'
                            onClick={onSendNewPassword}>Send
                    </button>
                </div>
            </div>
        </div>
    )
}