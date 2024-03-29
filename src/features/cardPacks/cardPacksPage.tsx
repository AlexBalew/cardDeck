import React, {ChangeEvent, useEffect, useState} from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import {Pagination} from "../../common";
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {getPacksTC, setPageCountAC, setSearchedNameAC} from "./cardPacks-reducer";
import {AppStateType, useAppSelector} from "../../bll/store";
import style from '../../common/elements/doubleRange/DoubleRange.module.css'
import SuperDoubleRange from "../../common/elements/doubleRange/DoubleRange";
import {SelectPage} from "../../common/components/selectPage/SelectPage";
import {RequestStatusType} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";
import {TitleModal} from "../../common/components/modal/addNewPack/TitleModal";


export const CardPacksPage = React.memo(() => {

    let dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)
    const myId = useAppSelector<string>(state => state.app._id)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    const minCardsCount = useAppSelector<number>(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector<number>(state => state.packs.maxCardsCount)

    const [searchName, setSearchName] = useState<string>('') //search pack input state
    const [value1, setValue1] = useState(settingSlider.min) //slider's state
    const [value2, setValue2] = useState(settingSlider.max) //slider's state
    const [value3, setValue3] = React.useState<number[]>([value1, value2]); //slider's state
    const [open, setOpen] = useState(false) //modal state


    const onSetNewSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value
        setSearchName(search)
    }

    const onSetPageCount = (value: number) => {
        if (value) {
            dispatch(setPageCountAC(value))
        }
    }

    const onPageChange = (page: number) => {
        dispatch(getPacksTC({page}))
    }

    const onGetPacks = () => {
        setValue3([minCardsCount, maxCardsCount])
        dispatch(getPacksTC({page: 1, min: 0, max: 103}))
    }

    const onGetMyPacks = () => {
        dispatch(getPacksTC({myId, page: 1}))
    }

    useEffect(() => {
        let searchTimer = setTimeout(() => dispatch(setSearchedNameAC(searchName)), 1500)
        return () => clearTimeout(searchTimer)
    }, [searchName])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (

        <div className={s.container}>
            <div className={s.filterContainer}>
                <SuperButton className={s.btn} onClick={onGetMyPacks}>My packs</SuperButton>
                <SuperButton className={s.btn} onClick={onGetPacks}>All packs</SuperButton>
                <div className={style.doubleRangeBlock}>
                    <span className={style.choose}>Choose the amount of cards:</span>
                    <span className={style.span}>{value2}</span>
                    <SuperDoubleRange
                        value1={value1}
                        value2={value2}
                        value3={value3}
                        setValue1={setValue1}
                        setValue2={setValue2}
                        setValue3={setValue3}
                    />
                    <span className={style.span}>{value1 < value2 ? value1 : value2 - 1}</span>
                </div>
            </div>
            <div className={s.packsContainer}>
                <h1>Packs</h1>
                <div className={s.addNewPackInput}><input style={{border: '1px solid #C7A5A5', width: '200px'}}
                                                          onChange={onSetNewSearchName}
                                                          value={searchName}
                                                          placeholder={'search for pack names here'}/>
                </div>
                <div className={s.addNewPackButton}>
                    <SuperButton onClick={() => setOpen(true)
                    }>add new pack</SuperButton>
                </div>
                <TitleModal
                    message="Create a new pack of cards"
                    isOpen={open}
                    setOpen={setOpen}
                    onClose={() => setOpen(false)}
                />
                <CardPacksTable/>
                <div className={s.selectPagination}>
                    <SelectPage onChangeOptions={onSetPageCount}
                                value={pageCount}
                                disabled={status === "loading"}
                                description={'packs on page'}/>
                    <Pagination numberOfPagesInOnePortion={6} onPageChange={onPageChange}/>
                </div>
            </div>

        </div>
    )
})

export default CardPacksPage;