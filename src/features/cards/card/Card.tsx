import React from 'react';
import {CardType} from "../../../api/cards-api";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import s from "./Card.module.css";
import SuperButton from "../../../common/elements/button/SuperButton";

type CardPropsType = {
    card: CardType
    packId: string
}

export const Card: React.FC<CardPropsType> = ({card, packId}) => {

    const authUserId = useSelector<AppStateType, string>(state => state.profile._id)

    return (
        <div className={s.cardContainer}>
            <div>{card.question}</div>
            <div>{card.answer}</div>
            <div>update</div>
            <div>grade</div>
            <div>
                {authUserId !== card.user_id
                    ? null
                    : <div>
                        <SuperButton>EDIT</SuperButton>
                        <SuperButton>DELETE</SuperButton>
                    </div>
                }
            </div>
        </div>
    )
}

