import {useDispatch} from "react-redux";
import s from "./Modal.module.css";
import SuperInput from "../../../elements/input/SuperInput";
import SuperButton from "../../../elements/button/SuperButton";
import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {updateCard} from "../../../../features/cards/cards-reducer";
import {CardType} from "../../../../api/cards-api";


type UpdateCardsType = {
    packId: string
    card: CardType
    answer: string
    question: string
    showModal: boolean
    setShowModal: (show: boolean) => void
}
export const UpdateCardModal = (props: UpdateCardsType ) => {

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const dispatch = useDispatch();

    const onSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const updateCardHandler = () => {
         dispatch(updateCard(props.packId, props.card._id, question, answer))
        if (question !== '') {
            setQuestion('')
        }
        if (answer !== '') {
            setAnswer('')
        }
        props.setShowModal(false)
    }
    const activeModalHandler = () => {
        props.setShowModal(false)
    }
    const stopActiveModal = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return (
        <div className={s.modalContainer} onClick={activeModalHandler}>
            <div className={s.modalContent} onClick={stopActiveModal}>
                <h2 className={s.title}>Please, update this card</h2>
                <div className={s.inputModal}>
                    <SuperInput
                        type="text"
                        placeholder='question'
                        required
                        value={question}
                        onChange={onSetQuestion}
                        autoFocus/>
                </div>
                <div className={s.inputModal}>
                    <SuperInput className={s.modalInput}
                                type="text"
                                required
                                placeholder='answer'
                                value={answer}
                                onChange={onSetAnswer}
                    />
                </div>

                <SuperButton className={s.modalBtn}
                             type={"submit"}
                             onClick={updateCardHandler}>
                    OK </SuperButton>
            </div>
        </div>
    )

}