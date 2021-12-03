import React from 'react';
import './App.css';
import CardDeckRoutes from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import {RequestStatusType} from "./app-reducer";
import Preloader from "../common/components/preloader/Preloader";
import CardDeckRoutesUnauthorized from "./unauthorizedRoutes";
import SuperButton from "../common/elements/button/SuperButton";
import {logOutTC} from "../features/login/login-reducer";


function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)

    const onLogOut = () => {
        dispatch(logOutTC())
    }

    return (
        <div className='appStyle'>
            {status === 'loading' && <Preloader/>}
            {isLoggedIn ? <CardDeckRoutes/> : <CardDeckRoutesUnauthorized/>}
            {isLoggedIn && <div style={{position: "absolute", marginLeft: '90%', top: '20px'}}>
                <SuperButton onClick={onLogOut} style={{backgroundColor: '#f6f3f4'}}>Log out</SuperButton>
            </div>}

        </div>
    )
}

export default App;
