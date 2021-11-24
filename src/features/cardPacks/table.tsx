import React, {useEffect, MouseEvent} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {deletePackTC, getPacksTC, setPageCountAC} from "./cardPacks-reducer";
import s from './table.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/Routes";

export const CardPacksTable = () => {

    let dispatch = useDispatch()
    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']
    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    const page = useAppSelector<number>(state => state.packs.page)
    const myId = useAppSelector<string>(state => state.app._id)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [pageCount, page])

    const onSetPageCount = (e: MouseEvent<HTMLButtonElement>) => {
        let value = +e.currentTarget.value
        dispatch(setPageCountAC(value))
    }

    const onDeletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }

    return (
        <div>
            <table className={s.table}>
                <thead>
                <tr >
                    {titles.map(title => <th key={Math.floor(Math.random()*100000)} className={s.title}>{title}</th>)}
                </tr>
                </thead>
                <tbody>
                    {packs.map(pack =>
                        <tr className={s.dataRow}>
                            <td className={s.nameColumn}>{pack.name}</td>
                            <td>
                                <NavLink to={PATH.CARDS + `/${pack._id}`}>{pack.name}</NavLink>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            {pack.user_id === myId
                                ? <td><button
                                    onClick={() => {onDeletePack(pack._id)}}
                                    value={pack._id}>
                                    delete
                                </button>
                                    <button>edit</button>
                                    <button>learn</button></td>
                                : <td><button>learn</button></td>}
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={onSetPageCount} value={4}>4</button>
            <button onClick={onSetPageCount} value={10}>10</button>
            <button onClick={onSetPageCount} value={20}>20</button>
        </div>
    )
}