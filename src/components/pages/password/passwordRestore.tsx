import React, {ChangeEvent, useState} from "react";
import s from './passwordRestore.module.css'
import {useDispatch} from "react-redux";
import {sendCurrentEmailTC} from "../../../reducers/restorePassReducer";

type PasswordRestorePropsType = {}

export const PasswordRestore = (props: PasswordRestorePropsType) => {

    let dispatch = useDispatch()

    const [value, setValue] = useState<string>('')

    const onSetCurrentEmail = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setValue(value)
    }
    const onSendCurrentEmail = () => {
        dispatch(sendCurrentEmailTC(value))
    }


    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                <div>
                    Failed to remember your password?
                </div>
                <div>
                    <input type='email'
                           name='currentEmail'
                           placeholder='your e-mail'
                           onChange={onSetCurrentEmail}
                           style={{border: '1px solid black'}}
                    />
                </div>
                <div>
                    <button name='sendCurrentEmail'
                            onClick={onSendCurrentEmail}>Send
                    </button>
                </div>
                <div>
                    <a href={'/login'}>Remembered password? Try to log in</a>
                </div>
            </div>
        </div>
    )
}