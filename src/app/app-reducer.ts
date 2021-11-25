import {Dispatch} from "redux";
import {loginAPI} from "../api/login-api";
import {setErrorAC} from "../features/password/password-reducer";
import {isLoggedInAC} from "../features/login/login-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    _id: string
}

const initialState: InitialStateType = {
    status: 'idle',
    _id: ''
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_USER_ID':
            return {...state, _id: action.id}
        default:
            return state
    }
}

export type ActionsType = setAppStatusACType | setUsersIDACType
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setUsersIDACType = ReturnType<typeof setUsersIDAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        status
    } as const
}

export const setUsersIDAC = (id: string) => {
    return {
        type: 'APP/SET_USER_ID',
        id
    } as const
}



export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await loginAPI.authMe()
        dispatch(isLoggedInAC(true))
        dispatch(setUsersIDAC(response.data._id))
        await Promise.all([response])
        dispatch(setAppStatusAC("succeeded"))
        return response
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
        dispatch(isLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
    }
}