import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {Error404} from '../common/components/error404/error404'
import {Login} from '../features/login/login'
import {Profile} from '../features/profile/profile'
import {Registration} from '../features/registration/registration'
import {PasswordRestore} from "../features/password/passwordRestore";
import {NewPassword} from "../features/password/newPassword";
import {TestComps} from "../tresh/test/testCompsPage";
import {NewPasswordWithoutToken} from "../features/password/newPasswordWithoutToken";
import {useSelector} from "react-redux";
import {AppStateType} from "../bll/store";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RESTORE_PASSWORD: '/restore-password',
    NEW_PASSWORD: '/new-password',
    NEW_PASSWORD_WITH_TOKEN: '/new-password/:token',
    TEST: '/test',
    NOT_FOUND: '/404'
}

function CardDeckRoutes() {

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)

    const routes = (isLoggedIn: boolean) => {
        const routeObjects = [
            {path: '/cardDeck', element: <Navigate to={PATH.LOGIN}/>},
            {path: PATH.PROFILE, element: <Profile/>},
            {path: PATH.LOGIN, element: <Login/>},
            {path: PATH.REGISTRATION, element: <Registration/>},
            {path: PATH.RESTORE_PASSWORD, element: <PasswordRestore/>},
            {path: PATH.NEW_PASSWORD_WITH_TOKEN, element: <NewPassword/>},
            {path: PATH.NEW_PASSWORD, element: <NewPasswordWithoutToken/>},
            {path: PATH.TEST, element: <TestComps/>},
            {path: PATH.NOT_FOUND, element: <Error404/>},
            {path: '*', element: <Navigate to={PATH.NOT_FOUND}/>},
        ]
        return routeObjects.map(routeObject => ({
            ...routeObject,
            element: isLoggedIn || routeObject.path === PATH.LOGIN ? routeObject.element : <Navigate to={PATH.LOGIN}/>
        }))
    }

    return useRoutes(routes(isLoggedIn))


    // return (
    //     <div>
    //         {/*<Routes>*/}
    //
    //         {/*    <Route path={'/cardDeck'} element={<Navigate to={PATH.LOGIN}/>}/>*/}
    //         {/*    <Route path={PATH.LOGIN} element={<Login/>}/>*/}
    //         {/*    <Route path={PATH.REGISTRATION} element={<Registration/>}/>*/}
    //         {/*    <Route path={PATH.PROFILE} element={<Profile/>}/>*/}
    //         {/*    <Route path={PATH.RESTORE_PASSWORD} element={<PasswordRestore/>}/>*/}
    //         {/*    <Route path={PATH.NEW_PASSWORD} element={<NewPasswordWithoutToken/>}/>*/}
    //         {/*    <Route path={PATH.NEW_PASSWORD_WITH_TOKEN} element={<NewPassword/>}/>*/}
    //         {/*    <Route path={PATH.TEST} element={<TestComps/>}/>*/}
    //         {/*    <Route path={PATH.NOT_FOUND} element={<Error404/>}/>*/}
    //         {/*    <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>*/}
    //         {/*</Routes>*/}
    //     </div>
    // )
}

export default CardDeckRoutes
