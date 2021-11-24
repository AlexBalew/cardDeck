import React, {useEffect} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType} from "../../api/cards-api";
import {useNavigate, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import Pagination from "../../common/components/pagination/pagination";
/*import {SelectPage} from "../../common/components/selectPage/SelectPage";*/


export const Cards = () => {
    const dispatch = useDispatch()


    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const packName = useSelector<AppStateType, string>(state => state.cards.packName)
    const cardId = "619c20e519837f019f391b23"
    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getCards(packId!))
    }, [dispatch, packId, page])


    return (
        <div className={s.container}>

            {/* <div className={s.backLink}>
                <NavLink className={s.link} to={'/packs-list'}>
                    <i className={s.arrow}></i>Back{packName}
                </NavLink>
            </div>*/}

            <div className={s.cardsContainer}>

                <div className={s.backLink}>
                    <div onClick={() => navigate('/packs-list')} className={s.arrowBack}>&larr;{packName}</div>
                </div>

                <div className={s.search}>
                    Search
                    <SuperButton onClick={() => dispatch(getCards(packId!))}>ADD NEW CARD</SuperButton>
                </div>

                <div className={s.cardsTable}>
                    {!cards.length
                        ? <div className={s.noCards}>
                            <span>There are no cards in this pack...</span>
                        </div>
                        :
                        <div className={s.cards}>
                            <div className={s.card}>
                                <div>Question</div>
                                <div>Answer</div>
                                <div>
                                    <div><span>Last Updated</span></div>
                                    <div><span>Grade</span></div>
                                    <div>Actions</div>
                                </div>
                            </div>
                            {cards.map(el =>
                                <div key={el._id}>
                                    <Card card={el} packID={packId!}/>
                                </div>)}
                        </div>
                    }
                </div>
                <div className={s.paginator}><Pagination numberOfPagesInOnePortion={6}/></div>
            </div>
        </div>)
}


