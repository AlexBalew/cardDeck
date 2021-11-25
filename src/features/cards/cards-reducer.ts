import {CardType, cardsAPI, NewCardType} from "../../api/cards-api";
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
}


export const cardsReducer = (state: stateType = initState, action: AllACType): stateType => {
    switch (action.type) {
        case 'cardsReducer/SET_CARDS':
            return {
                ...state,
                cards: action.cards
            }
        default:
            return state
    }
}


type setCardsACType = ReturnType<typeof setCardsAC>
//type createCardsACType = ReturnType<typeof createCardAC>
//type setPackCardsIdACType = ReturnType<typeof setPackCardsIdAC>
type AllACType = setCardsACType


//* Action Creators --------------------------------------------------------->
export const setCardsAC = (cards: Array<CardType>) => ({type: 'cardsReducer/SET_CARDS', cards} as const)
//export const createCardAC = (card: CardType) => ({type: 'cardsReducer/CREATE_CARDS', card} as const)
//export const createCardsPackAC = (title: string) => ({type: 'cardsReducer/CREATE_CARDS_PACK', title} as const)
//export const setPackCardsIdAC = (packId: string) => ({type: 'cardsReducer/SET_PACK_CARDS_ID', packId} as const)

//* Thunk Creators --------------------------------------------------------->


export const getCards = (packId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC("loading"))

        const cards = getState().cards
        const currentPage = cards.page
        const packsOnPage = cards.pageCount

        cardsAPI.getCards(packId, currentPage, packsOnPage)
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


/*
export const CreateCardsPack = (title: string): AppThunkType =>
    (dispatch, getState) => {
        cardsAPI.createPack(title)
            .then(response => {
                console.log('OK')
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
            })

    }
*/
