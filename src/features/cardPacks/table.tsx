import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {deletePackTC, getPacksTC} from "./cardPacks-reducer";
import s from './table.module.css'
import btn from '../cards/card/Card.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/Routes";
import SuperButton from "../../common/elements/button/SuperButton";


export const CardPacksTable = React.memo(() => {

    let dispatch = useDispatch()

    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']

    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)
    //const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    //const page = useAppSelector<number>(state => state.packs.page)
    const myId = useAppSelector<string>(state => state.app._id)
    const searchedName = useAppSelector<string>(state => state.packs.searchedName)
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)


    useEffect(() => {
        dispatch(getPacksTC())
        console.log('Main useEffect(table)')
    }, [searchedName, settingSlider.min, settingSlider.max])



    const onDeletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    return (
        <div className={s.mainContainer}>
            <table className={s.table}>
                <thead className={s.tableHead}>
                <tr >
                    {titles.map((title, index) => <th key={title + index} className={s.title}>{title}</th>)}
                </tr>
                </thead>
                <tbody className={s.tableBody}>
                    {packs.map(pack =>
                        <tr className={s.dataRow} key={pack._id}>
                            <td>
                                <NavLink to={PATH.CARDS + `/${pack._id}`}>{pack.name}</NavLink>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            {pack.user_id === myId
                                ? <td><SuperButton
                                    className={btn.btn}
                                    onClick={() => {onDeletePack(pack._id)}}
                                    value={pack._id}>
                                    delete
                                </SuperButton>
                                    <SuperButton className={btn.btn}>edit</SuperButton>
                                    <SuperButton className={btn.btn}>learn</SuperButton></td>
                                : <td><SuperButton className={btn.btn}>learn</SuperButton></td>}
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
})