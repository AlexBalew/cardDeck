import {CardType, cardsAPI} from "../../api/cards-api";
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
    sortCards: undefined as string | undefined,
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
        default:
            return state
    }
}


type setCardsACType = ReturnType<typeof setCardsAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type setSearchedQuestionACType = ReturnType<typeof setSearchedQuestionAC>

type AllActionsType = setCardsACType | setPageCountACType | setSearchedQuestionACType


//* Action Creators --------------------------------------------------------->
export const setCardsAC = (cards: Array<CardType>) => ({type: 'cardsReducer/SET_CARDS', cards} as const)
export const setPageCountAC = (pageCount: number) =>( {type: 'cardsReducer/SET_PAGE_COUNT', pageCount} as const)
export const setSearchedQuestionAC = (cardQuestion: string) => ({type: 'cardsReducer/SEARCH_CARDS', cardQuestion } as const)



//* Thunk Creators --------------------------------------------------------->

export const getCards = (packId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))

        const cards = getState().cards

        const currentPage = cards.page
        const packsOnPage = cards.pageCount
        const cardQuestion = cards.cardQuestion

        cardsAPI.getCards(packId, packsOnPage, currentPage, cardQuestion)
            .then(response => {
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
        cardsAPI.updateCard(updateCard)
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

