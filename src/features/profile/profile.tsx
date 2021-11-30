import React, {ChangeEvent, useEffect, useState} from "react";
import s from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";
import userDefaultImg from "../../assets/profile/userDefaultImg.png"
import Preloader from "../../common/components/preloader/Preloader";
import {RequestStatusType} from "../../app/app-reducer";
import SuperEditableSpan from "../../common/elements/editableSpan/SuperEditableSpan";
import {changeUserData} from "./profile-reducer";

export const Profile = React.memo(() => {
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const name = useSelector<AppStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppStateType, string>(state => state.profile.avatar)
    const email = useSelector<AppStateType, string | null>(state => state.profile.email)

    const [myName, setMyName] = useState('')
    const [myAvatar, setMyAvatar] = useState<string | undefined>(undefined)

    useEffect(() => {
        setMyName(name)
        if (avatar) {
            setMyAvatar(avatar)
        }

    }, [name, avatar])
    if (status === 'loading') {
        return <Preloader/>
    }

    const changeNameHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setMyName(e.currentTarget.value)
    }
    const setUserDataHandler = () => {
        dispatch(changeUserData({name: myName, avatar: myAvatar}))
    }
    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setMyAvatar(e.currentTarget.value)
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.content}>
                    <div className={s.profileAvatar}>
                        <img src={avatar ? avatar : userDefaultImg}  alt="ava"/>
                    </div>
                    <label>Change image <input type="text" onChange={changeImageHandler} onBlur={setUserDataHandler}/></label>
                    {/*<div className={s.profileName}>{myName}</div>*/}
                    <SuperEditableSpan className={s.profileName} value={myName} onChange={changeNameHandle} onBlur={setUserDataHandler}/>
                    <div>{email ? email : "email not write"}</div>
                </div>
            </div>

        </div>
    )
});