import React, {useEffect, MouseEvent} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {getPacksTC, setPageCountAC} from "./cardPacks-reducer";
import s from './table.module.css'

export const CardPacksTable = () => {

    let dispatch = useDispatch()
    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']
    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [pageCount])

    const onSetPageCount = (e: MouseEvent<HTMLButtonElement>) => {
        let value = +e.currentTarget.value
        dispatch(setPageCountAC(value))
    }

    return (
        <div>
            <table className={s.table}>
                <thead>
                <tr >
                    {titles.map(title => <th key={Math.floor(Math.random()*1000)} className={s.title}>{title}</th>)}
                </tr>
                </thead>
                <tbody>
                    {packs.map(pack =>
                        <tr className={s.dataRow}>
                            <td>{pack.name}</td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            <td><button>click</button></td>
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