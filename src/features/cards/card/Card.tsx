import React from 'react';
import {CardType} from "../../../api/cards-api";

type CardPropsType = {
    card: CardType
    packID: string
}

export const Card: React.FC<CardPropsType> = ({card, packID}) => {


    return (
        <div>
            cards
        </div>
    )
}


