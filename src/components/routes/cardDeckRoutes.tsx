import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Error404 } from '../pages/error404/error404'
import {Login} from '../pages/login/login'
import { Profile } from '../pages/profile/profile'
import { Registration } from '../pages/registration/registration'
import {PasswordRestore} from "../pages/password/passwordRestore";
import {NewPassword} from "../pages/password/newPassword";
import {TestComps} from "../pages/test/testCompsPage";


export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore-password',
    NEW_PASSWORD: '/new-password',
    TEST: '/test'
}

function CardDeckRoutes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Routes>

                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу PRE_JUNIOR*/}
                {/*exact нужен чтоб указать полное совпадение (что после '/' ничего не будет)*/}
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<TestComps/>}/>
                // add routes

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route element={<Error404/>}/>

            </Routes>

        </div>
    )
}

export default CardDeckRoutes
