import React, {ReactNode} from "react";
import UniTable from "../../common/elements/table/uniTable";
import {useDispatch, useSelector} from "react-redux";
import { getPacksTC } from "./cardPacks-reducer";
import {AppStateType} from "../../bll/store";

export const CardPacksPage = () => {

    const dispatch = useDispatch()

/*const model = [
    {
        title:(index:number)=>{
            return 'title'
    },
        render:(dataItem: any, modelIndex: number, dataIndex: number) => {
            return ',ghyj'
        }
    }
]
    const data = [
        {_id:1,value:"test"},
        {_id:2,value:"test"},
        {_id:4,value:"test"},
        {_id:5,value:"test"},
        {_id:7,value:"test"},
    ]*/

    let data = useSelector<AppStateType, number>(state => state.packs?.cardPacksTotalCount!)

    const onDispatch = () => {
        dispatch(getPacksTC())
    }


    return (
        <div>
            packs
            <button onClick={onDispatch}>Get</button>
          {/*  <UniTable model={model} data={data}/>*/}
            <div>{data}</div>
        </div>
    )
}

export default CardPacksPage;