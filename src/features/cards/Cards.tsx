import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Cards.module.css'
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getCards, setGetRequestParamsAC, setPageCountAC, setSearchedQuestionAC} from "./cards-reducer";
import {AppStateType} from "../../bll/store";
import {CardType, RequestParamsType} from "../../api/cards-api";
import {useNavigate, useParams} from "react-router-dom";
import {Card} from "./card/Card";
import {RequestStatusType} from "../../app/app-reducer";
import {SelectPage} from "../../common/components/selectPage/SelectPage";
import SuperInput from "../../common/elements/input/SuperInput";
import {SortArrow} from "../../common/components/sortArrow/SortArrow";
import {CreateModal} from "../../common/components/modalWindows/cardsModal/CreateModal";


export const Cards = React.memo(() => {

//* Data -------------------------------------------------------------------------------------->
    const dispatch = useDispatch()

    const cards = useSelector<AppStateType, Array<CardType>>(state => state.cards.cards)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const packName = useSelector<AppStateType, string>(state => state.cards.packName)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)
    const packUserId = useSelector<AppStateType, string>(state => state.cards.packUserId)
    const authUserId = useSelector<AppStateType, string>(state => state.app._id)

    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()

//* Local state --------------------------------------------------------------------------------->
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const [showModal, setShowModal] = useState(false)

    const isUsersPack = packUserId === authUserId




//* Callbacks -- --------------------------------------------------------------------------------->

    const openModalWindow = () => {
        setShowModal(true)
    }


    const onSetQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSetPageCount = (value: number) => {
        if (value) {
            dispatch(setPageCountAC(value))
        }
    }

   /* const handlerCreateCard = (packId: string, question: string, answer: string) => {
        dispatch(createCards(packId!, question, answer))
        setQuestion('')
        setAnswer('')
    }*/

    const onSetSearchValue = (value: string) => {
        setSearchValue(value)
        console.log('setSearchValue')
    }
    const searchCards = () => {
        dispatch(setSearchedQuestionAC(searchValue))
        dispatch(getCards(packId!))
        setSearchValue('')
        console.log('send search request to the server')
    }

    const setGetRequestParams = (requestParams: RequestParamsType) => {
        dispatch(setGetRequestParamsAC(requestParams))
        dispatch(getCards(packId!))
    }
    const sortCards = (param: string) => setGetRequestParams({sortCards: param})



    useEffect(() => {
        dispatch(getCards(packId!))
    }, [dispatch, packId, page, pageCount])

    console.log('packName', packName)


//* JSX ------------------------------------------------------------------------------------------->
    return (
        <div className={s.container}>
            <div className={s.cardsContainer}>

                {showModal && <CreateModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    packId={packId!}
                />}
                <div className={s.backLink}>
                    <div onClick={() => navigate('/packs-list')} className={s.arrowBack}>&larr;{packName}</div>
                </div>


                <div className={s.search}>
                    <div className={s.searchBlock}>
                        <form className={s.searchForm}>
                            <SuperInput type="text"
                                        placeholder="Search.."
                                        onChangeText={onSetSearchValue}
                                        value={searchValue}
                                        onEnter={searchCards}/>
                            <button className={s.searchBtn}
                                    onClick={searchCards}
                                    disabled={status === "loading"}
                                    type="submit">&#8617;</button>
                        </form>
                    </div>
                    <div className={s.addCard}>
                        {/*<div>
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
                        </div>*/}

                        { (isUsersPack) ? <SuperButton onClick={openModalWindow}
                                     disabled={status === "loading"}>ADD CARD</SuperButton>
                        : <SuperButton disabled>ADD CARD</SuperButton>
                        }
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
                                    <div>
                                        <span>Last updated</span>
                                        <SortArrow onClick={sortCards} sortValue={'updated'} status={status}/>
                                    </div>
                                    <div>
                                        <span style={{marginLeft: '5px'}}>Grade</span>
                                        <SortArrow onClick={sortCards} sortValue={'grade'} status={status}/>
                                    </div>
                                    { (isUsersPack) && <div className={s.gradeTitle}>Actions</div>}
                                </div>
                            </div>
                            <div>
                                {cards.map(el =>
                                    <div key={el._id}>
                                        <Card card={el} packId={packId!}
                                              question={question} answer={answer} setQuestion={setQuestion} setAnswer={setAnswer}
                                              onSetQuestion={onSetQuestion} onSetAnswer={onSetAnswer}/>
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
                                    description={'Cards on page'}/>
                    </div>

                </div>

            </div>
        </div>)


})


