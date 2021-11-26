import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {createCards, getCards, setPageCountAC} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType} from "../../api/cards-api";
import {useNavigate, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import Pagination from "../../common/components/pagination/pagination";
import {RequestStatusType} from "../../app/app-reducer";
import {SelectPage} from "../../common/components/selectPage/SelectPage";


export const Cards = () => {
    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const packName = useSelector<AppStateType, string>(state => state.cards.packName)
    const userId = useSelector<AppStateType, string>(state => state.profile._id)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)
    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()


    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const onSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const handlerCreateCard = (packId: string, question: string, answer: string) => {
        dispatch(createCards(packId!, question, answer))
        setQuestion('')
        setAnswer('')
    }
    const onSetPageCount = (value: number) => {
        if (value) {
            dispatch(setPageCountAC(value))
        }
    }


    useEffect(() => {
        dispatch(getCards(packId!))
    }, [dispatch, packId, page, pageCount])


    return (
        <div className={s.container}>
            <div className={s.cardsContainer}>

                <div className={s.backLink}>
                    <div onClick={() => navigate('/packs-list')} className={s.arrowBack}>&larr;{packName}</div>
                </div>

                <div className={s.search}>
                    Search
                    <div className={s.addCard}>
                        <div>
                            <input
                                className={s.addDataCard}
                                onChange={onSetQuestion}
                                value={question}
                                placeholder={'insert question'}
                            />
                            <input
                                className={s.addDataCard}
                                onChange={onSetAnswer}
                                value={answer}
                                placeholder={'insert answer'}
                            />
                        </div>
                        <SuperButton onClick={() => handlerCreateCard(packId!, question, answer)}
                                     disabled={status === "loading"}
                        >ADD CARD</SuperButton>
                    </div>
                </div>

                <div className={s.cardsTable}>
                    {!cards.length
                        ? <div className={s.noCards}>
                            <span>There are no cards in this pack...</span>
                        </div>
                        :
                        <div className={s.cards}>
                            <div className={s.card}>
                                <div className={s.cardsHeader}>
                                <div className={s.infoItem}>Question</div>
                                <div className={s.infoItem}>Answer</div>
                                    <div><span>Last updated</span></div>
                                    <div><span style={{marginLeft: '5px'}}>Grade</span></div>
                                    <div>Actions</div>
                                </div>
                            </div>
                            <div>
                            {cards.map(el =>
                                <div key={el._id}>
                                    <Card card={el} packId={packId!}/>
                                </div>)}
                            </div>
                        </div>
                    }
                </div>
                <div className={s.footer}>
                    <div className={s.selector}>
                        <SelectPage onChangeOptions={onSetPageCount}
                                    value={pageCount}
                                    disabled={status === "loading"}
                                    description={'cards on page'}/>
                    </div>

                </div>

            </div>
        </div>)
}


