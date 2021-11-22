import React, {useEffect} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardDataType} from "../../api/cards-api";
import {useParams} from "react-router-dom";


export const Cards = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardDataType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const {packId} = useParams<string>()


    return (
        <div className={s.container}>
            <h1>Cards</h1>
            <div className={s.cardsContainer}>
                <div></div>
                <SuperButton>GET CARDS</SuperButton>
            </div>

        </div>
    )
}