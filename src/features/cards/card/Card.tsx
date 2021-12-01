import React, {ChangeEvent} from 'react';
import {CardType} from "../../../api/cards-api";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import s from "./Card.module.css";
import SuperButton from "../../../common/elements/button/SuperButton";
import {deleteCard, updateCard} from "../cards-reducer";


type CardPropsType = {
    card: CardType
    packId: string
    question: string
    answer: string
    setQuestion: (value: string) => void
    setAnswer: (value: string) => void
    onSetQuestion: (e: ChangeEvent<HTMLInputElement>) => void
    onSetAnswer: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Card: React.FC<CardPropsType> = React.memo(({card, packId, question, answer,  setQuestion,  setAnswer}) => {
    let dispatch = useDispatch()

    const authUserId = useSelector<AppStateType, string>(state => state.app._id)

    const handlerDeleteCard = (packId: string, cardId: string) => {
        dispatch(deleteCard(cardId, packId))
    }

    const updateCardHandler = () => {
        dispatch(updateCard(packId, card._id, question, answer))
        if (question !== '') {
            setQuestion('')
        }
        if (answer !== '') {
            setAnswer('')
        }
    }







    return (
        <div className={s.cardContainer}>
            <div className={s.col}>{card.question}</div>
            <div>{card.answer}</div>
            <div>{card.updated}</div>
            <div>{card.grade}</div>
            <div>
                {authUserId !== card.user_id
                    ? null
                    : <div>
                        <SuperButton className={s.btn} onClick={updateCardHandler}>EDIT</SuperButton>
                        <SuperButton className={s.btn}
                                     onClick={() => handlerDeleteCard(packId, card._id)}
                        >DELETE</SuperButton>
                    </div>
                }
            </div>
        </div>
    )
})

