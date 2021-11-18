import React, {useEffect} from 'react';
import './App.css';
import CardDeckRoutes from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import Preloader from "../common/components/preloader/Preloader";
import CardDeckRoutesUnauthorized from "./unauthorizedRoutes";
import SuperButton from "../common/elements/button/SuperButton";
import {logOutTC} from "../features/login/login-reducer";
import {useLocation} from "react-router-dom";


function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const location = useLocation()

    const onLogOut = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        if(!(location.pathname === '/restore-password')) {
            dispatch(initializeAppTC())}
        }, [])

    console.log(isLoggedIn)

    return (
        <div className='appStyle'>
            {status === 'loading' && <Preloader/>}
            {isLoggedIn ?  <CardDeckRoutes/> : <CardDeckRoutesUnauthorized/>}
            <div style={{position: "absolute", marginLeft: '90%', top: '20px'}} ><SuperButton onClick={onLogOut}>Log out</SuperButton></div>
        </div>
    )
}

export default App;
