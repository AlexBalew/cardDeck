import React, {useEffect, useState} from "react";
import SuperButton from "../../../elements/button/SuperButton";
import {CardType} from "../../../../api/cards-api";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../../bll/store";
import ReactDOM from "react-dom";
import s from './learningPageModal.module.css'
import {getCards} from "../../../../features/cards/cards-reducer";

type ModalPropsType = {
    isOpen: boolean
    onClose: () => void
    packId?: string
}

const grades = ['what is it??', 'not my day', 'got it wrong', 'forgot the answer', 'a good one', 'figured it out!', 'easy peasy'];

const getCard = (cards: CardType[]) => {

    //const weight = [/*0, 1, 2,*/ 3, 4, /*5, 6*/]
    /*const cardWeight = cards.map(card => 6 - card.grade)
    console.log('cardWeight: ', cardWeight)
    const n = Math.floor(Math.random() * 10);

    for (let i = 0; i < cardWeight.length; i++) {
        if (n < cardWeight[i]) {
            console.log('card: ', cards[i])
            return cards[i];
        }
    }*/

    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)


    return cards[res.id + 1];
}


export const LearningPageModal = ({isOpen, onClose, packId}: ModalPropsType) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const cards = useAppSelector<CardType[]>(state => state.cards.cards);
    /*const {id} = useParams();*/

    const [card, setCard] = useState<CardType>({
        answer: '',
        cardsPack_id: '',
        comments: '',
        created: '',
        grade: 0,
        more_id: '',
        question: '',
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        __v: 0,
        _id: '',
    });

    const dispatch = useDispatch();

    useEffect(() => {

        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCards(packId!));
            setFirst(false);
        }

        if (cards.length > 0) {
            setCard(getCard(cards)!)
        }


        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, packId, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards)!);
        } else {
            return <div>this was the last card</div>
        }
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={s.modalContainer} onClick={onClose}>
            <div className={s.modal} onClick={(e) => {
                e.stopPropagation()
            }}>
                Try your knowledge!
                <div>{card.question}</div>
                <div>
                    <SuperButton onClick={() => setIsChecked(true)}>check</SuperButton>
                </div>
                {isChecked && (
                    <>
                        <div>{card.answer}</div>
                        <div className={s.buttons}>
                            {grades.map((grade, i) => (
                                <SuperButton key={'grade-' + i} onClick={() => {
                                }}>{grade}</SuperButton>
                            ))}
                        </div>
                        <div><SuperButton onClick={onNext}>next</SuperButton></div>
                    </>
                )}
            </div>
        </div>
        , document.body)
};
