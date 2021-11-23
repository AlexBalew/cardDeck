import {instance_local} from "./api";


export const cardsAPI = {
    getCards(cardsPack_id: string, pageCount: number = 5, page: number = 1) {
        return instance_local.get<CardsResponseType>
        (`cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}`)
    },
    createPack(title: string) {
        return instance_local.post<PacksResponseType>
        (`cards/pack`, { cardsPack: {name: title}})
    },

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
    packUserId: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type PacksResponseType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
    token: string
    tokenDeathTime: number
}