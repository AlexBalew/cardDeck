import React, {ChangeEvent, useEffect, useState} from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import Pagination from "../../common/components/pagination/pagination";
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {createPackTC, getPacksTC, setPageCountAC, setSearchedNameAC} from "./cardPacks-reducer";
import {AppStateType, useAppSelector} from "../../bll/store";
import style from '../../common/elements/doubleRange/DoubleRange.module.css'
import SuperDoubleRange from "../../common/elements/doubleRange/DoubleRange";
import {SelectPage} from "../../common/components/selectPage/SelectPage";
import {RequestStatusType} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/Routes";


export const CardPacksPage = React.memo(() => {

    let dispatch = useDispatch()

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)
    const myId = useAppSelector<string>(state => state.app._id)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    //const minCardsCount = useAppSelector<number>(state => state.packs.minCardsCount)
    //const maxCardsCount = useAppSelector<number>(state => state.packs.maxCardsCount)

    const [newName, setNewName] = useState<string>('') //add new pack input state
    const [searchName, setSearchName] = useState<string>('') //search pack input state
    const [value1, setValue1] = useState(settingSlider.min) //slider's state
    const [value2, setValue2] = useState(settingSlider.max) //slider's state
    const [value3, setValue3] = React.useState<number[]>([value1, value2]); //slider's state


    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
        console.log('onSetNewName')
    }

    const onSetNewSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value
        setSearchName(search)
        console.log('onSetNewSearchName')
        }

    const onSetPageCount = (value: number) => {
        if(value){
            dispatch(setPageCountAC(value))
        }
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
        console.log('onClickNewName')
    }

    const onPageChange = (page: number) => {
        dispatch(getPacksTC({page}))
    }

    const onGetPacks = () => {
        //dispatch(setCardsCountAC(0, 103))
        //dispatch(getPacksTC())
        //dispatch(setCardsCountAC(minCardsCount, maxCardsCount))
        /*setValue1(minCardsCount)
        setValue2(maxCardsCount)
        setValue3([minCardsCount, maxCardsCount])*/
       dispatch(getPacksTC({page: 1}))
        /*console.log('setter: allPacks')
        console.log('minCardsCount: ', minCardsCount)
        console.log('maxCardsCount: ', maxCardsCount)*/
    }

    const onGetMyPacks = () => {
        //dispatch(setCardsCountAC(minCardsCount, maxCardsCount))
       //dispatch(setCurrentPageAC(1))
       /* setValue1(minCardsCount)
        setValue2(maxCardsCount)
        setValue3([minCardsCount, maxCardsCount])*/
        dispatch(getPacksTC({ myId, page: 1 }))
        /*console.log('setter: myPacks')
        console.log('minCardsCount: ', minCardsCount)
        console.log('maxCardsCount: ', maxCardsCount)*/
    }

    useEffect(() => {
        let searchTimer = setTimeout(() => dispatch(setSearchedNameAC(searchName)), 1500)
        console.log('сработал серч')
        return () => clearTimeout(searchTimer)
    }, [searchName])

    if (!isLoggedIn) {
        debugger
        return <Navigate to={PATH.LOGIN}/>
    }

    //console.log('cardPacksPage isLoggedIn: ', isLoggedIn)

    return (

        <div className={s.container}>
            <div className={s.filterContainer}>
                <SuperButton onClick={onGetMyPacks}>My packs</SuperButton>
                <SuperButton onClick={onGetPacks}>All packs</SuperButton>
                <div className={style.doubleRangeBlock}>
                    <span className={style.choose}>Choose the the amount of cards:</span>
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
                <div className={s.addNewPackInput}><input style={{border: '1px solid #C7A5A5'}}
                                                          onChange={onSetNewSearchName}
                                                          value={searchName}
                                                          placeholder={'search for pack names here'}/>
                    <input style={{border: '1px solid #C7A5A5'}}
                           onChange={onSetNewName}
                           value={newName}
                           placeholder={'insert title here'}/>

                </div>
                <div className={s.addNewPackButton}>
                    <SuperButton onClick={() => {
                        onClickNewName(newName)
                    }}>add new pack</SuperButton>
                </div>
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