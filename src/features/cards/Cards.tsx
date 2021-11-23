import React, {useEffect} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {createCards, deleteCard, getCards} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType} from "../../api/cards-api";
import {useParams} from "react-router-dom";
import {Card} from "./card/Card";

interface ParamTypes {
    tokenName: string | undefined
}


export const Cards = () => {
    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const cardId =  "619c20e519837f019f391b23"
    const {packID}: any = useParams()
    //const packID = '2343545465'



    useEffect(() => {
        dispatch(getCards(packID))
    }, [dispatch, packID, page])

    const copyCards = cards.map(el => <tbody key={el._id}>
    <Card card={el} packID={packID}/>
    </tbody>)


    return (
        <div className={s.container}>
            <h1>Cards</h1>
            <div className={s.cardsContainer}>
                <div>
                </div>
                <SuperButton onClick={ () => dispatch(getCards(packID))}>GET CARDS</SuperButton>
               {/* <SuperButton onClick={ () => dispatch(CreateCardsPack('rer'))}>ADD PACK</SuperButton>*/}
                <SuperButton onClick={ () => dispatch(createCards(packID, 'What is it?', 'It is answer.'))}>CREATE CARD</SuperButton>
                <SuperButton onClick={ () => dispatch(deleteCard(cardId, packID))}>DELETE CARD</SuperButton>
            </div>

        </div>
    )
}


