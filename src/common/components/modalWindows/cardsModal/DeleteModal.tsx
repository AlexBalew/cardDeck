import {MouseEvent,} from "react";
import s from "../cardsModal/Modal.module.css";
import {useDispatch} from "react-redux";
import {deleteCard} from "../../../../features/cards/cards-reducer";
import SuperButton from "../../../elements/button/SuperButton";


type DeleteCardsType = {
    showModal: boolean
    setShowModal: (show: boolean) => void
    cardId: string
    packId: string
}

export const DeleteCardModal = (props: DeleteCardsType) => {

    const dispatch = useDispatch();

    const deleteCardHandler = () => {
        dispatch(deleteCard(props.cardId, props.packId))
        props.setShowModal(false)
    }

    const resetCardsHandler = () => props.setShowModal(false)
    const activeModalHandler = () => props.setShowModal(false)
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <h2 className={s.title}>Are you sure to delete this card?</h2>
                <div className={s.allButton}>
                    <SuperButton className={s.modalBtn}
                                 type={"submit"}
                                 onClick={deleteCardHandler}>
                        YES</SuperButton>
                    <SuperButton className={s.modalBtn}
                                 type={"submit"}
                                 onClick={resetCardsHandler}>
                        NO</SuperButton>
                </div>
            </div>
        </div>
    )
}