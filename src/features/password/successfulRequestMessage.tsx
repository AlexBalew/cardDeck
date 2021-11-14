import React from "react";
import s from "./passwordRestore.module.css";

export const SuccessfulRequestMessage = () => {
    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>

                <img src='https://icon-library.com/images/e-mail-icon-png/e-mail-icon-png-28.jpg' style={{width: '200px'}} alt='letter'/>
                <div>
                    Check E-mail
                </div>
                <div>
                    We've sent a letter with instructions on your e-mail
                </div>
            </div>
        </div>
    )
}
