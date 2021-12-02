import {setAppStatusAC} from "../../app/app-reducer";
import {GetPacksResponseType, packsAPI} from "../../api/packs-api";
import {AppThunkType} from "../../bll/store";

export type SettingType = { settingSlider: { min: number; max: number } }
export type SearchedNameType = { searchedName: string }


type stateType = GetPacksResponseType & SettingType & SearchedNameType

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
    pageCount: 10,
    settingSlider: {
        min: 0,
        max: 103
    },
    searchedName: '',
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
        }
        case 'cardPacks/DELETE_PACK' : {
            return {...state, cardPacks: state.cardPacks.filter(cardPack => cardPack._id !== action.payload)}
        }
        case 'cardPacks/SEARCH_NAME' : {
            return {...state, searchedName: action.payload}
        }
        case 'cardPacks/SET_CARDS_COUNT' : {
            return {...state, settingSlider: {min: action.payload.minSliderCards, max: action.payload.maxSliderCards}}
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

export const setSearchedNameAC = (searchName: string) => {
    return {
        type: 'cardPacks/SEARCH_NAME',
        payload: searchName
    } as const
}


export const setCardsCountAC = (minSliderCards: number, maxSliderCards: number) => {
    return {
        type: 'cardPacks/SET_CARDS_COUNT',
        payload: {minSliderCards, maxSliderCards}
    } as const
}


export const getPacksTC = (params?: { myId?: string, page?: number, min?: number, max?: number }): AppThunkType => async (dispatch, getState) => { //затипизировать везде
    let {pageCount, page, searchedName, settingSlider} = getState().packs
    try {
        dispatch(setAppStatusAC("loading"))
        const pageNumber = params?.page ? params.page : page
        let settingSliderMin = params?.min ? params?.min : settingSlider.min
        let settingSliderMax = params?.max ? params?.max : settingSlider.max
        let response = await packsAPI.getPacks(pageCount, pageNumber, params?.myId, searchedName, /*settingSlider,*/ settingSliderMin, settingSliderMax)
        dispatch(setCardPacksDataAC(response.data))
        dispatch(setAppStatusAC("succeeded"))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
        /* if(e.response.request.status === 401) { раскомментировать 03.12
         dispatch(isLoggedInAC(false))
         }*/
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
        await packsAPI.deletePack(id)
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

export const updatePackTC = (id: string, name?: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await packsAPI.updatePack(id, name)
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
export const setGradeTC = (grade: number, cardId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        await packsAPI.sendGrade(grade, cardId)
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
    ReturnType<typeof deletePackAC> |
    ReturnType<typeof setSearchedNameAC> |
    ReturnType<typeof setCardsCountAC>


