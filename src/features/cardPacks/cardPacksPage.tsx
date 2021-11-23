import React from "react";
import {useDispatch} from "react-redux";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';

export const CardPacksPage = () => {

    const dispatch = useDispatch()

    return (
        <div className={s.container}>
            <h1>Packs</h1>
            <div className={s.packsContainer}>
            <CardPacksTable/>
            </div>
        </div>
    )
}

export default CardPacksPage;