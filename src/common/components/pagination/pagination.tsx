import React, {ChangeEvent, useState} from "react";
import s from './pagination.module.css';
import {useAppSelector} from "../../../bll/store";
import {useDispatch} from "react-redux";
import {setCurrentPageAC} from "../../../features/cardPacks/cardPacks-reducer";


type PaginationPropsType = {
    numberOfPagesInOnePortion: number
}


let Pagination = ({numberOfPagesInOnePortion}: PaginationPropsType) => {

    let dispatch = useDispatch()
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let [inputPage, setInputPage] = useState<number|string>('')

    let cardPacksTotalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    let pageCount = useAppSelector<number>(state => state.packs.pageCount)
    let currentPage = useAppSelector<number>(state => state.packs.page)

    let totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)
    let pages = []
    for (let i = 1; i <= totalAmountOfPages; i++) {
        pages.push(i)
    }

    let numberOfPortions = Math.ceil(totalAmountOfPages / numberOfPagesInOnePortion)

    let leftPortionPageNumber = (portionNumber - 1) * numberOfPagesInOnePortion + 1
    let rightPortionPageNumber = portionNumber * numberOfPagesInOnePortion

    const onSetNewPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    const onSetNewPageFromInput = (e: ChangeEvent<HTMLInputElement>) => {
        let page = +e.currentTarget.value
        setInputPage(page)
    }

    const onSetNewPageByButton = (inputPage: number) => {
        dispatch(setCurrentPageAC(inputPage))
        setInputPage('')
    }

    return (

        <div className={s.pagination}>
            <div className={s.pages}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>prev</button>}
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <span key={page} className={currentPage === page ? s.selectedPage : s.pageNumber}
                                 onClick={() => {
                                     onSetNewPage(page)
                                 }}>{page} </span>
                })}
            {numberOfPortions > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>next</button>}
            </div>
            <input style={{border: '1px solid',
                width: '40px',
                marginLeft: '20px',
                marginRight: '5px'}}
                   onChange={onSetNewPageFromInput}
                   value={inputPage!}
                   placeholder={'page'}
            />
            <button onClick={() => {
                onSetNewPageByButton(+inputPage)
            }}>＞
            </button>
        </div>
    )
}

export default Pagination