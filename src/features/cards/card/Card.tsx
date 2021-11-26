import React from 'react';
import {CardType} from "../../../api/cards-api";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import s from "./Card.module.css";
import SuperButton from "../../../common/elements/button/SuperButton";
import {deleteCard} from "../cards-reducer";


type CardPropsType = {
    card: CardType
    packId: string
}

export const Card: React.FC<CardPropsType> = ({card, packId}) => {
    let dispatch = useDispatch()

    const authUserId = useSelector<AppStateType, string>(state => state.app._id)

    const handlerDeleteCard = (packId: string, cardId: string) => {
        dispatch(deleteCard(cardId, packId))
    }

    return (
        <div className={s.cardContainer}>
            <div className={s.col}>{card.question}</div>
            <div>{card.answer}</div>
            <div>update</div>
            <div>grade</div>
            <div>
                {authUserId !== card.user_id
                    ? null
                    : <div>
                        <SuperButton className={s.btn}>EDIT</SuperButton>
                        <SuperButton className={s.btn}
                                     onClick={() => handlerDeleteCard(packId, card._id)}
                        >DELETE</SuperButton>
                    </div>
                }
            </div>
        </div>
    )
}

