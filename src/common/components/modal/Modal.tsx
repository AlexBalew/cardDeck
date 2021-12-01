import React from "react";
import ReactDOM from "react-dom";
import s from './Modal.module.css'

type ModalPropsType = {
    message: string
    isOpen: boolean
    onClose: () => void
}

export const Modal = ({message, isOpen, onClose, /*children*/}: ModalPropsType) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.modal} onClick={(e) => {e.stopPropagation()}}>
                <span>{message}</span>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
        , document.body);
}

