import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import s from "./profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {Navigate, useLocation} from "react-router-dom";
import {PATH} from "../../app/Routes";
import Preloader from "../../common/components/preloader/Preloader";
import {initializeAppTC, RequestStatusType} from "../../app/app-reducer";
import SuperEditableSpan from "../../common/elements/editableSpan/SuperEditableSpan";
import {changeUserData} from "./profile-reducer";
import userDefaultImg from "../../assets/profile/userDefaultImg.png"

export const Profile = React.memo(() => {
    const dispatch = useDispatch()
    const inRef = useRef<HTMLInputElement>(null);

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const name = useSelector<AppStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppStateType, string>(state => state.profile.avatar)
    const email = useSelector<AppStateType, string | null>(state => state.profile.email)

    const [myName, setMyName] = useState<string>(name)

    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/profile') {
            dispatch(initializeAppTC())
        }
    }, [location])

    // useEffect(() => {
    //     setMyName(name)
    //     if (avatar) {
    //         setMyAvatar(avatar)
    //     }
    // }, [name, avatar])

    if (status === 'loading') {
        return <Preloader/>
    }

    const changeNameHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setMyName(e.currentTarget.value)
    }
    const setUserDataHandler = () => {
        dispatch(changeUserData({name: myName, avatar: avatar}))
    }
    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const reader = new FileReader();

        const newFile = e.target.files && e.target.files[0]

        reader.onloadend = () => {

            dispatch(changeUserData({name: myName, avatar: reader.result}))
        };
        if (newFile) {
            reader.readAsDataURL(newFile)
        }
        // dispatch(changeUserData({name: myName, avatar: myAvatar}))


    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.content}>
                    <div className={s.profileAvatar}>
                        <img src={avatar ? avatar : userDefaultImg} alt="ava"/>
                    </div>
                    {/*<label>Change image <input type="text"*/}
                    {/*                           onChange={changeImageHandler}*/}
                    {/*                           onBlur={setUserDataHandler}/></label>*/}
                    <input type="file" ref={inRef} style={{display: 'none'}} onChange={changeImageHandler}/>
                    <button onClick={() => inRef && inRef.current && inRef.current.click()}>add</button>

                    <SuperEditableSpan className={s.profileName}
                                       value={myName}
                                       onChange={changeNameHandle}
                                       onBlur={setUserDataHandler}/>
                    <div>{email ? email : "email not write"}</div>
                </div>
            </div>

        </div>
    )
});