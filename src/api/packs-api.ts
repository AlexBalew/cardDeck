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
    getPacks(pageCount: number, page: number, user_id?: string, minCardsCount?: number, maxCardsCount?:number, searchedName?: string) {
        if (user_id) {
            return instance_local.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&user_id=${user_id}`, {})
        }
        if (minCardsCount||maxCardsCount) {
            return instance_local.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&min=${minCardsCount}&max=${maxCardsCount}`, {})
        }
        if(searchedName) {
            return instance_local.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&packName=${searchedName}`, {})
        }
        return instance_local.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}`, {})

    },
    createPack(name: string) {
        return instance_local.post<GetPacksResponseType>(`/cards/pack`, {cardsPack: {name}}, {})
    },
    deletePack(id: string) {
        return instance_local.delete<GetPacksResponseType>(`/cards/pack?id=${id}`, {})
    }
}