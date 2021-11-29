import React, {useEffect, useState} from "react";
import s from "./profile.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";
import userDefaultImg from "../../assets/profile/userImg.png"
import Preloader from "../../common/components/preloader/Preloader";
import {RequestStatusType} from "../../app/app-reducer";

export const Profile = React.memo(() => {

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const name = useSelector<AppStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppStateType, string>(state => state.profile.avatar)
    const email = useSelector<AppStateType, string | null>(state => state.profile.email)


    const [myName, setMyName] = useState('')
    const [myAvatar, setMyAvatar] = useState<string>('Avatar is not defined')

    console.log('avatar: ', avatar)
    useEffect(() => {
        setMyName(name)
        if (avatar) {
            setMyAvatar(avatar)
        }
    }, [name, avatar])
    if (status === 'loading') {
        return <Preloader/>
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.content}>
                    <div className={s.profileAvatar}>
                        <img src={`${avatar !== 'Avatar is not defined' ? myAvatar : userDefaultImg}`} alt="ava"/>
                    </div>
                    <div className={s.profileName}>{myName}</div>
                    <div>{email ? email : "email not write"}</div>
                </div>
            </div>

        </div>
    )
});