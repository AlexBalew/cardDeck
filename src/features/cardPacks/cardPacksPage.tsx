import React from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import Pagination from "../../common/pagination/pagination";

export const CardPacksPage = () => {

    return (
        <div className={s.container}>
            <h1>Packs</h1>
            <div className={s.packsContainer}>
                <CardPacksTable/>
                <Pagination numberOfPagesInOnePortion={6}/>
            </div>

        </div>
    )
}

export default CardPacksPage;