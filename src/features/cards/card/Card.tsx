import React, {useState} from 'react';
import {CardType} from "../../../api/cards-api";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import s from "./Card.module.css";
import SuperButton from "../../../common/elements/button/SuperButton";
import {DeleteCardModal} from "../../../common/components/modalWindows/cardsModal/DeleteModal";
import {RequestStatusType} from "../../../app/app-reducer";
import {UpdateCardModal} from "../../../common/components/modalWindows/cardsModal/UpdateModal";



type CardPropsType = {
    card: CardType
    packId: string
    isUsersPack: boolean
}

export const Card: React.FC<CardPropsType> = React.memo(({
                                                             card,
                                                             packId,
                                                             isUsersPack,
                                                         }) => {
//* Data -------------------------------------------------------------------------------------->
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)

//* Local state ------------------------------------------------------------------------------->
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)


//* Callbacks ---------------------------------------------------------------------------------->
    const openDeleteModalWindow = () => {
        setShowDeleteModal(true)
    }
    const openUpdateModalWindow = () => {
        setShowUpdateModal(true)
    }
    return (
        <>
            {showDeleteModal &&
            <DeleteCardModal
                cardId={card._id}
                packId={packId}
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
            />}
            {showUpdateModal &&
            <UpdateCardModal
                card={card}
                packId={packId}
                answer={card.answer}
                question={card.question}
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
            />}

            <div className={s.cardContainer}>
                <div>{card.question}</div>
                <div>{card.answer}</div>
                <div>{card.updated}</div>
                <div>{card.grade}</div>
                <div>
                    {!isUsersPack
                        ? null
                        : <div>
                            <SuperButton className={s.btn} onClick={openUpdateModalWindow}>EDIT</SuperButton>
                            <SuperButton className={s.btn}
                                         disabled={status === "loading"}
                                         onClick={openDeleteModalWindow}
                            >DELETE</SuperButton>
                        </div>
                    }
                </div>
            </div>
        </>
    )
})

