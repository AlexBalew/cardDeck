import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {getPacksTC} from "./cardPacks-reducer";

export const CardPacksTable = () => {

    let dispatch = useDispatch()
    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']
    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    return (
        <div>
            <table >
                <thead>
                <tr >
                    {titles.map(title => <th key={Math.floor(Math.random()*1000)}>{title}</th>)}
                </tr>
                </thead>
                <tbody>
                    {packs.map(pack =>
                        <tr>
                            <td>{pack.name}</td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}