import React, {useState} from "react";
import {AddNewPackModal} from "./addNewPack/AddNewPackModal";
import s from './Component.module.css'

function Component() {
    const [open, setOpen] = useState(false)
    return (
        <div className={s.component}>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <AddNewPackModal
                message="hey hey"
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default Component