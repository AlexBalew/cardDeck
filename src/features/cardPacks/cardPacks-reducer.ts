import {Dispatch} from "redux";
import {restoreAPI} from "../../api/password-api";
import {Nullable} from "../../types";
import {setAppStatusAC, setAppStatusACType} from "../../app/app-reducer";
import {GetPacksResponseType, packsAPI} from "../../api/packs-api";

type stateType = Nullable<GetPacksResponseType>

let initState: stateType = null

export const cardPacksReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'cardPacks/GET_CARD_PACKS' : {
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

type AllACType = setCardPacksDataACType | setAppStatusACType | setErrorACType

type setCardPacksDataACType = ReturnType<typeof setCardPacksDataAC>

export const setCardPacksDataAC = (data: GetPacksResponseType) => {
    return {
        type: 'cardPacks/GET_CARD_PACKS',
        data
    } as const
}

export type setErrorACType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string) => {
    return {
        type: 'restore/SET_ERROR',
        error
    } as const
}


export const getPacksTC = () => async (dispatch: Dispatch<AllACType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await packsAPI.getPacks()
        dispatch(setCardPacksDataAC(response.data))
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
