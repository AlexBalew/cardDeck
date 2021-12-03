import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import ReactDOM from "react-dom";
import s from '../Modal.module.css'
import {createPackTC} from "../../../../features/cardPacks/cardPacks-reducer";
import {useDispatch} from "react-redux";
import SuperButton from "../../../elements/button/SuperButton";
import SuperInput from "../../../elements/input/SuperInput";

type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const TitleModal = ({message, isOpen, onClose, setOpen}: ModalPropsType) => {

    let dispatch = useDispatch()

    const [newName, setNewName] = useState<string>('') //add new pack input state

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
        setOpen(false)
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.modal} onClick={(e) => {
                e.stopPropagation()
            }}>
                <h2 className={s.title}>{message}</h2>
                <div>
                    <SuperButton className={s.modalBtnClose} onClick={onClose}>Close</SuperButton>
                </div>
                <SuperInput className={s.modalInput}
                            onChange={onSetNewName}
                            value={newName}
                            placeholder={'insert title here'}
                            autoFocus/>
                <SuperButton onClick={() => {
                    onClickNewName(newName)
                }}>add pack</SuperButton>
            </div>
        </div>
        , document.body);
}

