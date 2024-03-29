import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
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
    //const cardsTotalCount = useSelector<AppStateType, number>(state => state.cards.cardsTotalCount)
    const page = useSelector<AppStateType, number>(state => state.cards.page)
    const packName = useSelector<AppStateType, string>(state => state.cards.packName)
    const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const pageCount = useSelector<AppStateType, number>(state => state.cards.pageCount)
    const packUserId = useSelector<AppStateType, string>(state => state.cards.packUserId)
    const authUserId = useSelector<AppStateType, string>(state => state.app._id)

    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()

    const isUsersPack = packUserId === authUserId
    //const totalPages = Math.ceil(cardsTotalCount / pageCount)

//* Local state --------------------------------------------------------------------------------->
    const [searchValue, setSearchValue] = useState<string>('')
    const [showModal, setShowModal] = useState(false)


//* Callbacks ----------------------------------------------------------------------------------->

    const openModalWindow = () => {
        setShowModal(true)
    }
    const onSetPageCount = (value: number) => {
        if (value) {
            dispatch(setPageCountAC(value))
        }
    }
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

    const setGetRequestParams =useCallback((requestParams: RequestParamsType) => {
        dispatch(setGetRequestParamsAC(requestParams))
        dispatch(getCards(packId!))
    }, [dispatch])
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
                    <div onClick={() => navigate('/packs-list')}
                         className={s.arrowBack}>&larr;<span>{packName}</span></div>
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
                                        <Card card={el} packId={packId!} isUsersPack={isUsersPack}/>
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
                    {/*<div>
                        {totalPages < 8
                                ? null
                                : <Pagination
                                onPageChange={onSetPageCount}
                                numberOfPagesInOnePortion={6}/>
                        }
                    </div>*/}


                </div>

            </div>
        </div>)


})


