import React from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {Login} from '../features/login/login'
import {Profile} from '../features/profile/profile'
import {NewPassword} from "../features/password/newPassword";
import Header from "../common/components/header/header";
import {ChangePassword} from "../features/password/changePassword";
import CardPacksPage from "../features/cardPacks/cardPacksPage";
import {PasswordRestore} from "../features/password/passwordRestore";
import {Cards} from "../features/cards/Cards";
import {Error404} from "../common/components/error404/error404";
import {Registration} from "../features/registration/registration";

export const PATH = {
    LOGIN: '/login',
    PROFILE: '/profile',
    CHANGE_PASSWORD: '/change-password',
    NEW_PASSWORD_WITH_TOKEN: '/new-password/:token',
    CARDS: '/cards',
    NOT_FOUND: '/404',
    PACKS_LIST: '/packs-list',
    RESTORE_PASSWORD: '/restore-password',
    REGISTRATION: '/registration',
}

function CardDeckRoutes() {

    const location = useLocation()

    return (
        <div>
            {
                !(location.pathname === "/404") && <Header/>
            }
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>
                <Route path={PATH.NEW_PASSWORD_WITH_TOKEN} element={<NewPassword/>}/>
                <Route path={PATH.PACKS_LIST} element={<CardPacksPage/>}/>
                <Route path={PATH.CARDS + `/:packId`} element={<Cards/>}/>
                <Route path={PATH.NOT_FOUND} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
            </Routes>
        </div>
    )
}

export default CardDeckRoutes
