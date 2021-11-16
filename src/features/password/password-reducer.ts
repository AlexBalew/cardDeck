import {Dispatch} from "redux";
import {restoreAPI} from "../../api/password-api";
import {Nullable} from "../../types";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";

type stateType = {
    isSuccessfulRequest: boolean
    error: Nullable<string>
}

let initState: stateType = {
    isSuccessfulRequest: false,
    error: null
}


export const restorePassReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'restore/SET_SUCCESSFUL_REQUEST' : {
            return {...state, isSuccessfulRequest: action.isSuccessfulRequest}
        }
        case 'restore/SET_ERROR' : {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

type AllACType = restorePassACType | setErrorACType | setAppStatusACType

type restorePassACType = ReturnType<typeof setRequestResultAC>

export const setRequestResultAC = (isSuccessfulRequest: boolean) => {
    return {
        type: 'restore/SET_SUCCESSFUL_REQUEST',
        isSuccessfulRequest
    } as const
}

export type setErrorACType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string) => {
    return {
        type: 'restore/SET_ERROR',
        error
    } as const
}


export const sendCurrentEmailTC = (email: string) => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await restoreAPI.forgot(email)
        dispatch(setRequestResultAC(true))
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

export const setNewPasswordTC = (newPassword: string, token: string) => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await restoreAPI.newPassword(newPassword, token)
        dispatch(setRequestResultAC(true))
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