import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {deletePackTC, getPacksTC} from "./cardPacks-reducer";
import s from './table.module.css'
import btn from '../cards/card/Card.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/Routes";
import SuperButton from "../../common/elements/button/SuperButton";
import {DeleteModal} from "../../common/components/modal/deleteModal/deleteModal";


export const CardPacksTable = React.memo(() => {

    let dispatch = useDispatch()

    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']

    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    //const page = useAppSelector<number>(state => state.packs.page)
    const myId = useAppSelector<string>(state => state.app._id)
    const searchedName = useAppSelector<string>(state => state.packs.searchedName)
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)

    const [open, setOpen] = useState<string>('')

    useEffect(() => {
        dispatch(getPacksTC())
        console.log('Main useEffect(table)')
    }, [pageCount, searchedName, settingSlider.min, settingSlider.max])

    console.log(packs)

    return (
        <div className={s.mainContainer}>
            <table className={s.table}>
                <thead className={s.tableHead}>

                {titles.map((title, index) => <th key={title + index} className={s.title}>{title}</th>)}
                </thead>
                <tbody className={s.tableBody}>
                {packs.map(pack => {
                    const onDeletePack = () => {
                        dispatch(deletePackTC(pack._id))
                        console.log('delete: ', pack._id)
                        //setOpen(false)
                    }
                    console.log(pack.name, pack._id)
                        return <tr className={s.dataRow} key={pack._id}>
                            <td>
                                <NavLink to={PATH.CARDS + `/${pack._id}`}>{pack.name}</NavLink>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            {pack.user_id === myId
                                ?
                                <>
                                    <DeleteModal message={'Delete this pack?'}
                                                 isOpen={open === pack._id}
                                                 onClose={() => setOpen('')}
                                                 packId={pack._id}
                                                 onDelete={onDeletePack}
                                    />
                                    <td>
                                        <SuperButton
                                            className={btn.btn}
                                            onClick={() => setOpen(pack._id)}
                                            value={pack._id}>
                                            delete
                                        </SuperButton>
                                        <SuperButton className={btn.btn}>edit</SuperButton>
                                        <SuperButton className={btn.btn}>learn</SuperButton>
                                    </td>
                                </>
                                : <td><SuperButton className={btn.btn}>learn</SuperButton></td>}
                        </tr>
                    }
                )}
                </tbody>
            </table>

        </div>
    )
})