import React from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {CreateCardsPack, getCards} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType} from "../../api/cards-api";




export const Cards = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    //const {packId} = useParams<string>()
    const packId = "619c014b19837f019f391b1e"


    return (
        <div className={s.container}>
            <h1>Cards</h1>
            <div className={s.cardsContainer}>
                <div></div>
                <SuperButton onClick={ () => dispatch(getCards(packId))}>GET CARDS</SuperButton>
                <SuperButton onClick={ () => dispatch(CreateCardsPack('rer'))}>ADD PACK</SuperButton>

            </div>

        </div>
    )
}

