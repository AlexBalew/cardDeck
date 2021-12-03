import React, {ChangeEvent, useState} from "react";
import ReactDOM from "react-dom";
import s from '../Modal.module.css'
import SuperButton from "../../../elements/button/SuperButton";

type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    onEdit: (newName?: string) => void
}

export const UpdatePackTitleModal = ({message, isOpen, onClose, onEdit}: ModalPropsType) => {

    const [newName, setNewName] = useState<string>('') //add new pack input state

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    if (!isOpen) return null;
    console.log('update modal is rendered')
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
                    onEdit(newName)
                }}>add new pack's title</SuperButton>
            </div>
        </div>
        , document.body);
}

