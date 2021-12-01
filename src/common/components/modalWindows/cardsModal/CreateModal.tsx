import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import s from "../cardsModal/Modal.module.css";
import {useDispatch} from "react-redux";
import {createCards} from "../../../../features/cards/cards-reducer";
import SuperInput from "../../../elements/input/SuperInput";
import SuperButton from "../../../elements/button/SuperButton";


type CreateCardsType = {
    showModal: boolean
    setShowModal: (show: boolean) => void
    packId: string
}

export const CreateModal = (props: CreateCardsType) => {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    // const cardsPackID = useSelector<AppStateType, string>(state => state.packs.packCardsId)


    const CreateCardHandler = () => {
        dispatch(createCards(props.packId, question, answer))
        props.setShowModal(false)
    }

    const onPressEnterAdd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') CreateCardHandler();
    }

    const onSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
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
                <h2 className={s.title}>Please, enter the question and the answer of the card</h2>
                <div className={s.inputModal}>
                    <SuperInput
                                type="text"
                                placeholder='question'
                                required
                                value={question}
                                onChange={onSetQuestion}
                                onKeyPress={onPressEnterAdd}
                                autoFocus/>
                </div>
                <div className={s.inputModal}>
                    <SuperInput className={s.modalInput}
                                type="text"
                                required
                                placeholder='answer'
                                value={answer}
                                onChange={onSetAnswer}
                                onKeyPress={onPressEnterAdd}
                    />
                </div>

                <SuperButton className={s.modalBtn}
                    type={"submit"}
                             onClick={CreateCardHandler}>
                    OK </SuperButton>
            </div>
        </div>
    )
}

