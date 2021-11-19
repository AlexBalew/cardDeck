import React, {useCallback} from "react";
import s from './error404.module.css'
import {useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {logOutTC} from "../../../features/login/login-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../app/Routes";


export const Error404 = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }
    return (
        <div style={{background: 'black'}}>
            <a href="" target="_parent">
                <header className={s.topHeader}>
                </header>
                {/*dust particel*/}
                <div>
                    <div className={s.starSec}></div>
                    <div className={s.starThird}></div>
                    <div className={s.starFourth}></div>
                    <div className={s.starFifth}></div>
                </div>
                {/* Dust particle end*/}
                <div className={s.lampWrap}>
                    <div className={s.lamp}>
                        <div className={s.cable}></div>
                        <div className={s.cover}></div>
                        <div className={s.inCover}>
                            <div className={s.bulb}></div>
                        </div>
                        <div className={s.light}></div>
                    </div>
                </div>
                {/*END Lamp*/}
                <section className={s.error}>
                    {/*Content*/}
                    <div className={s.errorContent}>
                        <div className={s.errorMessage}>
                            <h1 className={s.messageTitle}>Page Not Found</h1>
                            <p className={s.messageText}>We're sorry, the page you were looking for isn't found here.
                                The link you followed may either be broken or no longer exists. Please try again, or
                                take a look at our.</p>
                        </div>
                        <div className={s.errorNav}>
                            <a href="" target="_parent" className={s.eNavLink}></a>
                        </div>
                    </div>
                    {/*END Content*/}
                </section>
            </a>
        </div>
    )
}