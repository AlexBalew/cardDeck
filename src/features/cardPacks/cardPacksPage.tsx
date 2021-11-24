import React, {ChangeEvent, useState} from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import Pagination from "../../common/components/pagination/pagination";
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch} from "react-redux";
import {createPackTC, getPacksTC} from "./cardPacks-reducer";
import {useAppSelector} from "../../bll/store";
import {Slider} from "../../common/elements/doubleRange/doubleRange";

export const CardPacksPage = () => {

    let dispatch = useDispatch()

    const [newName, setNewName] = useState<string>('')

    const myId = useAppSelector<string>(state => state.app._id)

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
    }

    const onGetAllPacks = () => {
        dispatch(getPacksTC())
    }

    const onGetMyPacks = () => {
        dispatch(getPacksTC(myId))
    }

    return (

        <div className={s.container}>
            <div className={s.filterContainer}>
                <div>Show packs</div>
                <SuperButton onClick={onGetMyPacks}>My packs</SuperButton>
                <SuperButton onClick={onGetAllPacks}>All packs</SuperButton>
               {/* <Slider min={0} max={100}/>*/}
            </div>
            <div className={s.packsContainer}>
                <h1>Packs</h1>
                <div className={s.addNewPackInput}><input style={{border: '1px solid #C7A5A5'}}
                                                          onChange={onSetNewName}
                                                          value={newName}
                                                          placeholder={'insert title here'}/></div>
                <div className={s.addNewPackButton}>
                    <SuperButton onClick={() => {
                        onClickNewName(newName)
                    }}>add new pack</SuperButton>
                </div>
                <CardPacksTable/>
                <Pagination numberOfPagesInOnePortion={6}/>
            </div>

        </div>
    )
}

export default CardPacksPage;