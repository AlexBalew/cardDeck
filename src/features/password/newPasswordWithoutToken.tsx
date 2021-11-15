import s from "./passwordRestore.module.css";
import React from "react";

export const NewPasswordWithoutToken = () => {
    return (
        <div className={s.mainContainer}>
            <div className={s.formContainer}>
                Go to 'restore password' page first and insert your e-mail
            </div>
        </div>
    )
}
