import React, {useState} from "react";
import s from './pagination.module.css';
import {useAppSelector} from "../../bll/store";
import {useDispatch} from "react-redux";
import {setCurrentPageAC} from "../../features/cardPacks/cardPacks-reducer";


type PaginationPropsType = {
    numberOfPagesInOnePortion: number
}


let Pagination = ({numberOfPagesInOnePortion}: PaginationPropsType) => {

    let dispatch = useDispatch()

    let cardPacksTotalCount = useAppSelector<number>(state => state.packs.cardPacksTotalCount)
    let pageCount = useAppSelector<number>(state => state.packs.pageCount)
    let currentPage = useAppSelector<number>(state => state.packs.page)

    let totalAmountOfPages = Math.ceil(cardPacksTotalCount / pageCount)
    let pages = []
    for (let i = 1; i <= totalAmountOfPages; i++) {
        pages.push(i)
    }

    let numberOfPortions = Math.ceil(totalAmountOfPages / numberOfPagesInOnePortion)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * numberOfPagesInOnePortion + 1
    let rightPortionPageNumber = portionNumber * numberOfPagesInOnePortion

    const onSetNewPage = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    return (

        <div className={s.pagination}>
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span key={p} className={currentPage === p ? s.selectedPage : s.pageNumber}
                                 onClick={() => {
                                     onSetNewPage(p)
                                 }}>{p} </span>
                })}
            {numberOfPortions > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>next</button>}
        </div>
    )
}

export default Pagination