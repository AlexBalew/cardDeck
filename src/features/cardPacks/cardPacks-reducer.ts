import {setAppStatusAC} from "../../app/app-reducer";
import {GetPacksResponseType, packsAPI} from "../../api/packs-api";
import {AppThunkType} from "../../bll/store";

type stateType = GetPacksResponseType

let initState: stateType = {
    cardPacks: [{
        _id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: '',
        user_name: '',
    }],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
}

export const cardPacksReducer = (state = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'cardPacks/GET_CARD_PACKS' : {
            return {...state, ...action.data}
        }
        case 'cardPacks/SET_PAGE_COUNT' : {
            return {...state, pageCount: action.payload}
        }
        case 'cardPacks/SET_MIN_CARDS_COUNT' : {
            return {...state, minCardsCount: action.payload}
        }
        case 'cardPacks/SET_MAX_CARDS_COUNT' : {
            return {...state, maxCardsCount: action.payload}
        }
        case 'cardPacks/SET_CURRENT_PAGE' : {
            return {...state, page: action.payload}
        } case 'cardPacks/DELETE_PACK' : {
            return {...state, cardPacks: state.cardPacks.filter(cardPack => cardPack._id !== action.payload)}
        }
        default:
            return state
    }
}

export const setCardPacksDataAC = (data: GetPacksResponseType) => {
    return {
        type: 'cardPacks/GET_CARD_PACKS',
        data
    } as const
}

export const setErrorAC = (error: string) => {
    return {
        type: 'cardPacks/SET_ERROR',
        error
    } as const
}

export const setMinCardsCountAC = (minCardsCount: number) => {
    return {
        type: 'cardPacks/SET_MIN_CARDS_COUNT',
        payload: minCardsCount
    } as const
}

export const setMaxCardsCountAC = (maxCardsCount: number) => {
    return {
        type: 'cardPacks/SET_MAX_CARDS_COUNT',
        payload: maxCardsCount
    } as const
}

export const setCurrentPageAC = (page: number) => {
    return {
        type: 'cardPacks/SET_CURRENT_PAGE',
        payload: page
    } as const
}

export const setPageCountAC = (pageCount: number) => {
    return {
        type: 'cardPacks/SET_PAGE_COUNT',
        payload: pageCount
    } as const
}

export const deletePackAC = (id: string) => {
    return {
        type: 'cardPacks/DELETE_PACK',
        payload: id
    } as const
}


export const getPacksTC = (): AppThunkType => async (dispatch, getState) => { //затипизировать везде
    let {pageCount, page} = getState().packs
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await packsAPI.getPacks(pageCount, page)
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

export const createPackTC = (name: string): AppThunkType => async (dispatch) => { //затипизировать везде
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await packsAPI.createPack(name)
        dispatch(setCardPacksDataAC(response.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("succeeded"))
    } finally {
        dispatch(getPacksTC())
    }

}

export const deletePackTC = (id: string): AppThunkType => async (dispatch) => { //затипизировать везде
    try {
        dispatch(setAppStatusAC("loading"))
        let response = await packsAPI.deletePack(id)
        dispatch(setCardPacksDataAC(response.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        dispatch(setErrorAC(error))
        dispatch(setAppStatusAC("succeeded"))
    } finally {
        dispatch(getPacksTC())
    }

}


type AllACType =
    ReturnType<typeof setCardPacksDataAC> |
    ReturnType<typeof setAppStatusAC> |
    ReturnType<typeof setErrorAC> |
    ReturnType<typeof setPageCountAC> |
    ReturnType<typeof setMinCardsCountAC> |
    ReturnType<typeof setMaxCardsCountAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof deletePackAC>
