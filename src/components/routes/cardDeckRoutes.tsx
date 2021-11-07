import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import { Error404 } from '../pages/error404/error404'
import {Login} from '../pages/login/login'
import { Profile } from '../pages/profile/profile'
import { Registration } from '../pages/registration/registration'


export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
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
                // add routes

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route element={<Error404/>}/>

            </Routes>

        </div>
    )
}

export default CardDeckRoutes
