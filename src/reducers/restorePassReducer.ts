import {Dispatch} from "redux";
import {restoreAPI} from "../api/restoreAPI";

type stateType = {}

let initState: stateType = {}


export const restorePassReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case '' : {
            return {...state}
        }
        default:
            return state
    }
}

type AllACType = restorePassACType

type restorePassACType = ReturnType<typeof restorePassAC>

export const restorePassAC = () => {
    return {
        type: ''
    } as const
}

export const sendCurrentEmailTC = (value: string) => async (dispatch: Dispatch<AllACType>) => {
    let response = await restoreAPI.forgot(value)
    console.log(response)
}