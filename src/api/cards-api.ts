import {instance} from "./api";


export const cardsAPI = {
    getCards(cardsPack_id: string, pageCount: number = 5, page: number = 1, cardQuestion: string,  cardAnswer: string, sortCards: string) {
        return instance.get<CardsResponseType>
        (`cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}&max=5&cardQuestion=${cardQuestion}&cardAnswer=${cardAnswer}&sortCards=${sortCards}`)
    },
    createCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post<CardsResponseType>
        (`cards/card`, { card: {cardsPack_id, question, answer}})
    },
    deleteCard(cardsPack_id: string) {
        return instance.delete<CardsResponseType>
        (`cards/card?id=${cardsPack_id}`)
    },
    updateCard(updateCard: updateCardType) {
        return instance.put<CardsResponseType>
        (`cards/card`, {card: updateCard})
    },
    /*updateGrade(grade: number, card_id: string) {
        return instance.put<updateGradeResponseType>('cards/grade', {grade, card_id})
    }*/
}

//* types --------------------------------------------------------->
export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type NewCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
}

type updateCardType = {
    _id: string,
    question?: string,
    answer?: string
}


export type RequestParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    sortCards?: string
    page?: number
    pageCount?: number
    min?: string
    max?: string
}

/*
export type updateGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}*/
