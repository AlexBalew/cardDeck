import {instance} from "./api";

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
    getPacks(pageCount: number, page: number, user_id?: string, minCardsCount?: number, maxCardsCount?:number, searchedName?: string,/* settingSlider?:{min: number, max: number}*/) {
        if (user_id) {
            return instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&user_id=${user_id}`, {})
        }
        if(searchedName) {
            return instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&packName=${searchedName}`, {})
        }
       /* // @ts-ignore
        if (settingSlider.min||settingSlider.max) {
            // @ts-ignore
            return instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&min=${settingSlider.min}&max=${settingSlider.max}`, {})
        }*/
        if (minCardsCount||maxCardsCount) {
            return instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}&min=${minCardsCount}&max=${maxCardsCount}`, {})
        }
         else {
            return instance.get<GetPacksResponseType>(`/cards/pack?pageCount=${pageCount}&page=${page}`, {})
        }


    },
    createPack(name: string) {
        return instance.post<GetPacksResponseType>(`/cards/pack`, {cardsPack: {name}}, {})
    },
    deletePack(id: string) {
        return instance.delete<GetPacksResponseType>(`/cards/pack?id=${id}`, {})
    }
}