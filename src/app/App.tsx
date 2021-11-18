import React, {useEffect} from 'react';
import './App.css';
import {useLocation} from "react-router-dom";
import Header from '../common/components/header/header';
import CardDeckRoutes from "./Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import Preloader from "../common/components/preloader/Preloader";


function App() {
    const location = useLocation()
    const dispatch = useDispatch()
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
        }, [])

    return (
        <div className='appStyle'>
            {
                !(location.pathname === "/404") && <Header/>
            }
            {status === 'loading' && <Preloader/>}

            <CardDeckRoutes/>
        </div>
    )
}

export default App;
