import {CardType, cardsAPI, RequestParamsType} from "../../api/cards-api";
import {AppThunkType} from "../../bll/store";
import {setAppStatusAC} from "../../app/app-reducer";



type stateType = typeof initState

const initState = {
    packName: '',
    cards: [] as CardType[],
    packUserId: '',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
    activeModal: false,
    cardAnswer: '',
    cardQuestion: '',
    sortCards: '',
}


export const cardsReducer = (state: stateType = initState, action: AllActionsType): stateType => {
    switch (action.type) {
        case 'cardsReducer/SET_CARDS':
            return {...state, cards: action.cards}
        case 'cardsReducer/SET_PAGE_COUNT' : {
            return {...state, pageCount: action.pageCount}
        }
        case 'cardsReducer/SEARCH_CARDS' : {
            return {...state, cardQuestion: action.cardQuestion}
        }
        case 'cardsReducer/SET_GET_REQUEST_PARAMS':
            return {...state, ...action.payload}
        case 'cardsReducer/SET_PACK_USER_ID':
            return {...state, packUserId: action.packUserId}
        case 'cardsReducer/SET_PACK_NAME':
            return {...state, packName: action.packName}
        default:
            return state
    }
}


type setCardsACType = ReturnType<typeof setCardsAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type setSearchedQuestionACType = ReturnType<typeof setSearchedQuestionAC>
type setGetRequestParamsACType = ReturnType<typeof setGetRequestParamsAC>
type setPackUserIdACType = ReturnType<typeof setPackUserIdAC>
type setPackNameACType = ReturnType<typeof setPackNameAC>


type AllActionsType = setCardsACType | setPageCountACType | setSearchedQuestionACType
    | setGetRequestParamsACType | setPackUserIdACType | setPackNameACType


//* Action Creators --------------------------------------------------------->
export const setCardsAC = (cards: Array<CardType>) => ({type: 'cardsReducer/SET_CARDS', cards} as const)
export const setPageCountAC = (pageCount: number) =>( {type: 'cardsReducer/SET_PAGE_COUNT', pageCount} as const)
export const setSearchedQuestionAC = (cardQuestion: string) => ({type: 'cardsReducer/SEARCH_CARDS', cardQuestion } as const)
export const setGetRequestParamsAC = (payload:  RequestParamsType) => ({type: 'cardsReducer/SET_GET_REQUEST_PARAMS', payload} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'cardsReducer/SET_PACK_USER_ID', packUserId} as const)
//export const setPackNameAC = (packName: string) => ({type: 'cardsReducer/SET_PACK_NAME', packName} as const)
export const setPackNameAC = (packName: string ) => ({type: 'cardsReducer/SET_PACK_NAME', packName} as const)

//* Thunk Creators --------------------------------------------------------->

export const getCards = (packId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))

        const cards = getState().cards

        const currentPage = cards.page
        const packsOnPage = cards.pageCount
        const cardQuestion = cards.cardQuestion
        const cardAnswer = cards.cardAnswer
        const sortCards = cards.sortCards


        cardsAPI.getCards(packId, packsOnPage, currentPage, cardQuestion, cardAnswer, sortCards)
            .then(response => {
                dispatch(setPackUserIdAC(response.data.packUserId))
                dispatch(setCardsAC(response.data.cards))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setAppStatusAC("failed"))
            })

    }

export const createCards = (cardsPack_id: string, question: string, answer: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))

        const cards = getState().cards
        /*const newCard: NewCardType = {cardsPack_id, question, answer}*/
        cardsAPI.createCard(cardsPack_id, question, answer)
            .then(response => {
                dispatch(getCards(cardsPack_id))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setAppStatusAC("failed"))
            })
    }

export const deleteCard = (cardId: string, packId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))

        const cards = getState().cards

        cardsAPI.deleteCard(cardId)
            .then(response => {
                dispatch(getCards(packId))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setAppStatusAC("failed"))
            })
    }

export const updateCard = (cardsPack_id: string, cardId: string, question: string, answer: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))
        const cards = getState().cards
        const updateCard = {_id: cardId, question, answer}
       return cardsAPI.updateCard(updateCard)
            .then(response => {
                dispatch(getCards(cardsPack_id))
                dispatch(setAppStatusAC("succeeded"))
                return true
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setAppStatusAC("failed"))
                return false
            })
    }

/*
export const gradeCardUpdate = (id: string, grade: number): AppThunkType =>
    (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    cardsAPI.updateGrade(grade, id)
        .then(() => {
            dispatch(getCards('100'))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setAppStatusAC("failed"))
            return false
        })
}*/
