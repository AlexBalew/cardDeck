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

   /* ?pageCount=${pageCount}&page=${page}&user_id=${user_id}*/

export const packsAPI = {
    getPacks(pageCount: number, page: number, user_id?: string, searchedName?: string, /*settingSlider?:{min: number, max: number},*/ settingSliderMin?: number, settingSliderMax?: number) {
            return instance.get<GetPacksResponseType>(`/cards/pack?min=${settingSliderMin}&max=${settingSliderMax}&packName=${searchedName}`,
                {params: {pageCount, page, user_id,}})
    },
    createPack(name: string) {
        return instance.post<GetPacksResponseType>(`/cards/pack`, {cardsPack: {name}}, {})
    },
    deletePack(id: string) {
        return instance.delete<GetPacksResponseType>(`/cards/pack?id=${id}`, {})
    },
    updatePack(_id: string, name?: string) {
        return instance.put<GetPacksResponseType>(`/cards/pack`, {cardsPack: {_id, name}}, {})
    },
    sendGrade(grade: number, cardId: string) {
        return instance.put<GetPacksResponseType>(`/cards/grade`, {grade, card_id: cardId}, {})
    }
}