import React, {useState} from "react";
import {Modal} from "./Modal";
import s from './Component.module.css'

function Component() {
    const [open, setOpen] = useState(false)
    return (
        <div className={s.component}>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal
                message="hey hey"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default Component