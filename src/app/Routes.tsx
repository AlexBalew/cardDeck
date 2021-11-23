import React from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {Error404} from '../common/components/error404/error404'
import {Login} from '../features/login/login'
import {Profile} from '../features/profile/profile'
import {NewPassword} from "../features/password/newPassword";
import Header from "../common/components/header/header";
import {ChangePassword} from "../features/password/changePassword";
import CardPacksPage from "../features/cardPacks/cardPacksPage";
import {PasswordRestore} from "../features/password/passwordRestore";
import {Cards} from "../features/cards/Cards";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    CHANGE_PASSWORD: '/change-password',
    NEW_PASSWORD_WITH_TOKEN: '/new-password/:token',
    CARDS: '/cards',
    TEST: '/test',
    NOT_FOUND: '/404',
    PACKS_LIST: '/packs-list',
    RESTORE_PASSWORD: '/restore-password',
}

function CardDeckRoutes() {

    const location = useLocation()

    return (
        <div>
            {
                !(location.pathname === "/404") && <Header/>
            }
            <Routes>
                {/*<Route path={'/cardDeck'} element={<Navigate to={PATH.LOGIN}/>}/>*/}
                <Route path={PATH.LOGIN} element={<Login/>}/>
                {/*<Route path={PATH.REGISTRATION} element={<Registration/>}/>*/}
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>
           {/*     <Route path={PATH.NEW_PASSWORD} element={<NewPasswordWithoutToken/>}/>*/}
                <Route path={PATH.NEW_PASSWORD_WITH_TOKEN} element={<NewPassword/>}/>
                <Route path={PATH.PACKS_LIST} element={<CardPacksPage/>}/>
                <Route path={PATH.CARDS} element={<Cards/>}/>
                {/*<Route path={PATH.TEST} element={<TestComps/>}/>*/}
                <Route path={PATH.NOT_FOUND} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
            </Routes>
        </div>
    )
}

export default CardDeckRoutes
