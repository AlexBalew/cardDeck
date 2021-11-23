import React from "react";
import {useDispatch} from "react-redux";


export const CardPacksPage = () => {

    const dispatch = useDispatch()

  /*  let data = useSelector<AppStateType, GetPacksResponseType>(state => state.packs)
    let titles = data.cardPacks.map(title => title.name)
    const tableTitles = Object.keys(data.cardPacks[0])
    console.log(tableTitles)

    const model = [
        {
            title: (index: number) => {
                return tableTitles.join(',')
            },
            render: (dataItem: any, modelIndex: number, dataIndex: number) => {
                return ',ghyj'
            }
        }
    ]*/
    const data1 = [
        {_id: 1, value: "test"},
        {_id: 2, value: "test"},
        {_id: 4, value: "test"},
        {_id: 5, value: "test"},
        {_id: 7, value: "test"},
    ]


    /*const onDispatch = () => {
        dispatch(getPacksTC())
    }*/


    return (
        <div>
            packs
           {/* <button onClick={onDispatch}>Get</button>*/}
           {/* <UniTable model={model} data={data1}/>*/}
            {/*  <div>{data}</div>*/}
        </div>
    )
}

export default CardPacksPage;