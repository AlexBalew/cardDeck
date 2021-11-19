import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Error404} from '../common/components/error404/error404'
import {Login} from '../features/login/login'
import {Registration} from '../features/registration/registration'
import {PasswordRestore} from "../features/password/passwordRestore";
import {NewPassword} from "../features/password/newPassword";
import {NewPasswordWithoutToken} from "../features/password/newPasswordWithoutToken";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    RESTORE_PASSWORD: '/restore-password',
    NEW_PASSWORD: '/new-password',
    NEW_PASSWORD_WITH_TOKEN: '/new-password/:token',
    NOT_FOUND: '/404',
}

function CardDeckRoutesUnauthorized() {

    return (
        <div>
            <Routes>
                <Route path={'/cardDeck'} element={<Navigate to={PATH.REGISTRATION}/>}/>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPasswordWithoutToken/>}/>
                <Route path={PATH.NEW_PASSWORD_WITH_TOKEN} element={<NewPassword/>}/>
                <Route path={PATH.NOT_FOUND} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
            </Routes>
        </div>
    )
}

export default CardDeckRoutesUnauthorized
