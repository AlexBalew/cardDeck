import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";
import {CardPackType, GetPacksResponseType} from "../../api/packs-api";
import {CardPacksTable} from "./table";

export const CardPacksPage = () => {

    const dispatch = useDispatch()

    let data = useSelector<AppStateType, GetPacksResponseType>(state => state.packs)
    //
    const packs = useSelector<AppStateType, CardPackType[]>(state => state.packs.cardPacks)
    //
    let packNames = useSelector<AppStateType, string[]>(state => state.packs.cardPacks.map(pack => pack.name))
    let cardsCount = useSelector<AppStateType, number[]>(state => state.packs.cardPacks.map(pack => pack.cardsCount))
    let lastUpdatedDate = useSelector<AppStateType, string[]>(state => state.packs.cardPacks.map(pack => pack.updated))
    let createdBy = useSelector<AppStateType, string[]>(state => state.packs.cardPacks.map(pack => pack.user_name))

    //let titles = data.cardPacks.map(title => title.name)
    //const tableTitles = Object.keys(data.cardPacks[0])
    //console.log(tableTitles)
   /* const model = packs.map((dataElement, index) => ({
            title: (index: number) => {
                return dataElement.name
            },
            render: (dataElement: CardPackType, modelIndex: number, dataIndex: number) => {
                return dataElement.name
            }
        })
    );
    console.log('model: ', model)
*/
    return (
        <div>
            packs
            <CardPacksTable/>
        </div>
    )
}

export default CardPacksPage;