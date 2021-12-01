import React, {ChangeEvent, useState} from "react";
import ReactDOM from "react-dom";
import s from './Modal.module.css'
import {createPackTC} from "../../../features/cardPacks/cardPacks-reducer";
import {useDispatch} from "react-redux";
import SuperButton from "../../elements/button/SuperButton";

type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
}

export const Modal = ({message, isOpen, onClose, /*children*/}: ModalPropsType) => {

    let dispatch = useDispatch()

    const [newName, setNewName] = useState<string>('') //add new pack input state

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.modal} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div >
                    <span>{message}</span>
                    <button onClick={onClose}>Close</button>
                </div>
                <input style={{border: '1px solid #C7A5A5'}}
                       onChange={onSetNewName}
                       value={newName}
                       placeholder={'insert title here'}/>
                <SuperButton onClick={() => {
                    onClickNewName(newName)
                }}>add new pack</SuperButton>
            </div>
        </div>
        , document.body);
}

