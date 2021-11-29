import {Dispatch} from "redux";
import {AppThunkType} from "../../bll/store";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {setErrorAC, setErrorACType} from "../password/password-reducer";
import {loginAPI, LoginResponseType} from "../../api/login-api";
import {Nullable} from "../../types";
import {setProfileData, setProfileDataACType} from "../profile/profile-reducer";

export type stateType = {
    isLoggedIn: boolean
    _id: string
    email: Nullable<string>
    name: Nullable<string>
    avatar?: string
}

let initState: stateType = {
    isLoggedIn: false,
    _id: '',
    email: null,
    name: null,
    avatar: '',
}

export const loginReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'login/SET_IS_LOGGED_IN' : {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case 'login/LOG_IN' : {
            return {
                ...state,
                name: action.payload.name,
                avatar: action.payload.avatar,
                email: action.payload.email,
                isLoggedIn: action.isLoggedIn
            }
        }
        default:
            return state
    }
}

type AllACType =
    isLoggedInACType
    | setAppStatusACType
    | setErrorACType
    | logInACType
    | setProfileDataACType

type isLoggedInACType = ReturnType<typeof isLoggedInAC>
type logInACType = ReturnType<typeof logInAC>

export const isLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'login/SET_IS_LOGGED_IN',
        isLoggedIn
    } as const
}

export const logInAC = (payload: LoginResponseType, isLoggedIn: boolean) => {
    return {
        type: 'login/LOG_IN',
        payload,
        isLoggedIn
    } as const
}

export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await loginAPI.login(email, password, rememberMe)
        dispatch(setProfileData(response))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(logInAC(response, true))
    } catch (e: any) {


        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("failed"))
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
        dispatch(setAppStatusAC("failed"))
    }

}

