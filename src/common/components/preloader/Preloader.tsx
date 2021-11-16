import s from "./Preloader.module.css";
import preloader from '../../../assets/preloader/preloader.gif'
import React from "react";


const Preloader = () => {

    return (
        <>
            <img className={s.preloader} src={preloader} alt={'preloader'}/>
        </>

    )
}

export default Preloader