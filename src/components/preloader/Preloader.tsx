import s from "./Preloader.module.css";
import Preloader3 from './Preloader Gif.gif';
import React from "react";

const Preloader = () => {
    return (
        <img className={s.preloader} src={Preloader3} alt={'preloader'}/>
    )
}

export default Preloader