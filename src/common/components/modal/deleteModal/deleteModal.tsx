import React from "react";
import ReactDOM from "react-dom";
import s from '../Modal.module.css'
import SuperButton from "../../../elements/button/SuperButton";

type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
    packId?: string
    onDelete: () => void
}

export const DeleteModal = ({message, isOpen, onClose,onDelete}: ModalPropsType) => {

    if (!isOpen) return null;
    console.log('delete modal is rendered')
    return ReactDOM.createPortal(
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.modal} onClick={(e) => {
                e.stopPropagation()
            }}>
                <h2>{message}</h2>
                <div>
                    <SuperButton className={s.modalBtnClose} onClick={onClose}>Close</SuperButton>
                </div>
                <SuperButton onClick={onDelete}>Delete</SuperButton>
                <SuperButton onClick={onClose}
                >Not now</SuperButton>
            </div>
        </div>
        , document.body);
}

