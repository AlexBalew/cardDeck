import {Dispatch} from "redux";
import {restoreAPI} from "../../api/password-api";
import {Nullable} from "../../types";


type stateType = {
    successfulRequest: boolean
    error: Nullable<string>
}

let initState: stateType = {
    successfulRequest: false,
    error: null
}


export const restorePassReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'restore/SET_SUCCESSFUL_REQUEST' : {
            return {...state, successfulRequest: action.successfulRequest}
        }
        case 'restore/SET_ERROR' : {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

type AllACType = restorePassACType | setErrorACType

type restorePassACType = ReturnType<typeof restorePassAC>

export const restorePassAC = (successfulRequest: boolean) => {
    return {
        type: 'restore/SET_SUCCESSFUL_REQUEST',
        successfulRequest
    } as const
}

type setErrorACType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string) => {
    return {
        type: 'restore/SET_ERROR',
        error
    } as const
}

export const sendCurrentEmailTC = (email: string) => async (dispatch: Dispatch<AllACType>) => {
    try {
        await restoreAPI.forgot(email)
        dispatch(restorePassAC(true))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
    }

}