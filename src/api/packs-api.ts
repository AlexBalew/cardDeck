import {instance_local} from "./api";

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

export type GetPacksResponseType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export const packsAPI = {
    getPacks(pageCount: number) {
        return instance_local.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}`, {})
    }
}