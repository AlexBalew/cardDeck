import React from 'react'
import {Navigate, Route} from 'react-router-dom'
import {Error404} from '../common/components/error404/error404'
import {Login} from '../features/login/login'
import {Profile} from '../features/profile/profile'
import {Registration} from '../features/registration/registration'
import {PasswordRestore} from "../features/password/passwordRestore";
import {NewPassword} from "../features/password/newPassword";
import {TestComps} from "../tresh/test/testCompsPage";
import {Routes} from "react-router-dom";
export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore-password',
    NEW_PASSWORD: '/new-password',
    TEST: '/test',
    NOT_FOUND: '/404'
}

function CardDeckRoutes() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<TestComps/>}/>
                <Route path={PATH.NOT_FOUND} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
            </Routes>
        </div>
    )
}

export default CardDeckRoutes
