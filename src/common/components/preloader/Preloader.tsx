import s from "./Preloader.module.css";
import preloader from '../../../assets/preloader/Eclipse200px.gif'
import React from "react";


const Preloader = () => {

    return (
        <div className={s.loading}>
            <img className={s.preloader} src={preloader} alt={'preloader'}/>
        </div>

    )
}

export default Preloader