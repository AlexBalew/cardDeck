import {Dispatch} from "redux";
import { AppThunkType} from "../../bll/store";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {setErrorAC, setErrorACType} from "../password/password-reducer";
import {loginAPI} from "../../api/login-api";

type stateType = {
    isLoggedIn: boolean
}

let initState: stateType = {
    isLoggedIn: false
}

export const loginReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'login/SET_IS_LOGGED_IN' : {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state
    }
}

type AllACType = isLoggedInACType | setAppStatusACType | setErrorACType

type isLoggedInACType = ReturnType<typeof isLoggedInAC>

export const isLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_IS_LOGGED_IN',
        isLoggedIn
    } as const
}

export const logInAC = (email: string, password: string, isAuthorized: boolean) => {
    return {
        type: 'login-reducer/SET_IS_AUTH',
        email,
        password,
        isAuthorized} as const
}

export const loginThunk = (email: string, password: string, rememberMe: boolean, isAuthorized: boolean): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    try {
        await loginApi.login(email, password, rememberMe)
            .then((res) => {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(logInAC(res.data.email, res.data.name, true))
            }).catch((e: any) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
                dispatch(setErrorAC(error))
                dispatch(setAppStatusAC("succeeded"))
        })
    }
}

export const logOutTC = () => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await loginAPI.logOut()
        dispatch(isLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("succeeded"))
    }

}

