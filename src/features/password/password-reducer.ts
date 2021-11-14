import {Dispatch} from "redux";
import { restoreAPI } from "../../api/password-api";


type stateType = {
    successfulRequest: boolean
}

let initState: stateType = {
    successfulRequest: false
}


export const restorePassReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'restore/SET_SUCCESSFUL_REQUEST' : {
            return {...state, successfulRequest: action.successfulRequest}
        }
        default:
            return state
    }
}

type AllACType = restorePassACType

type restorePassACType = ReturnType<typeof restorePassAC>

export const restorePassAC = (successfulRequest: boolean) => {
    return {
        type: 'restore/SET_SUCCESSFUL_REQUEST',
        successfulRequest
    } as const
}

export const sendCurrentEmailTC = (value: string) => async (dispatch: Dispatch<AllACType>) => {
    let response = await restoreAPI.forgot(value)
    dispatch(restorePassAC(true))
    console.log(response)
}