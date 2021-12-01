import React, {useState} from 'react'
import s from './SortArrow.module.css'
import {RequestStatusType} from "../../../app/app-reducer";

type SortArrowPropsType = {
    sortValue: any
    status: RequestStatusType
    onClick: (payload?: any) => void
}

export const SortArrow: React.FC<SortArrowPropsType> = ({sortValue, onClick, status}) => {

    const [arrowSort, setArrowSort] = useState(1)
    const onClickHandler = () => {
        if(status === 'succeeded') {
            arrowSort === 0 ? setArrowSort(1) : setArrowSort(0)
            onClick(`${arrowSort}${sortValue}`)
        }
    }

    return (
        <>
            {arrowSort === 0 ?
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &darr;</span> :
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &uarr;</span>}
        </>

    )
}
