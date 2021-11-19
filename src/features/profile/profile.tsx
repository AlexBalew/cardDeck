import React, {useCallback} from "react";
import s from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {UserDataType} from "./profile-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";
import userDefaultImg from "../../assets/profile/userDefaultImg.png"

export const Profile = () => {

    const dispatch = useDispatch()
    /*const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)*/
    const {name, avatar} = useSelector<AppStateType, UserDataType>(state => state.profile)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)


    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileContainer}>
            <div>
                <img className={s.profileAvatar} src={`${avatar !== 'Avatar is not defined' ? avatar : userDefaultImg }`} alt="ava"/>
                <span>{name}</span>
            </div>


        </div>
    )
}