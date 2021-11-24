import React, {useEffect} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {createCards, deleteCard, getCards} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType} from "../../api/cards-api";
import {useParams} from "react-router-dom";
import {Card} from "./card/Card";


export const Cards = () => {
    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const cardId = "619c20e519837f019f391b23"
    const {packId} = useParams<'packId'>()


    useEffect(() => {
        dispatch(getCards(packId!))
    }, [dispatch, packId, page])

    const copyCards = cards.map(el => <tbody key={el._id}>
    <Card card={el} packID={packId!}/>
    </tbody>)


    return (
        <div className={s.container}>
            <h1>Cards</h1>
            <div className={s.cardsContainer}>
                <div>
                    {
                        !cards.length
                            ? <div>
                                <span>There are no cards in this pack...</span>
                            </div>
                            : <table>
                                <thead>
                                <tr>
                                    <th>QUESTION</th>
                                    <th>ANSWER</th>
                                    <th>LAST UPDATE</th>
                                    <th>GRADE</th>
                                    <th>ACTIONS</th>
                                </tr>
                                </thead>
                                {copyCards}
                            </table>
                    }
                </div>
                <SuperButton onClick={() => dispatch(getCards(packId!))}>GET CARDS</SuperButton>
                <SuperButton onClick={() => dispatch(createCards(packId!, 'What is it?', 'It is answer.'))}>CREATE
                    CARD</SuperButton>
                <SuperButton onClick={() => dispatch(deleteCard(cardId, packId!))}>DELETE CARD</SuperButton>
            </div>

        </div>
    )
}


