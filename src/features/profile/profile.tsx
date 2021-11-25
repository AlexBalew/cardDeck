import React from "react";
import s from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";
import userDefaultImg from "../../assets/profile/userDefaultImg.png"
import Preloader from "../../common/components/preloader/Preloader";
import {RequestStatusType} from "../../app/app-reducer";
import {stateType} from "../login/login-reducer";

export const Profile = () => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const {name, avatar} = useSelector<AppStateType, stateType>(state => state.login)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    if (status === 'loading') {
        return <Preloader/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.aboutUser}>
                    <h2>About user</h2>
                    <img className={s.profileAvatar}
                         src={`${avatar !== 'Avatar is not defined' ? avatar : userDefaultImg}`} alt="ava"/>
                    <span>{name}</span>
                </div>
                <div className={s.content}>
                    <h2>Content</h2>
                </div>
            </div>

        </div>
    )
}