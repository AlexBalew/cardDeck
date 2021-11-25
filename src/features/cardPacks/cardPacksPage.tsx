import React, {ChangeEvent, useEffect, useState} from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import Pagination from "../../common/components/pagination/pagination";
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch} from "react-redux";
import {createPackTC, getPacksTC, setSearchedNameAC} from "./cardPacks-reducer";
import {useAppSelector} from "../../bll/store";
import style from '../../common/elements/doubleRange/DoubleRange.module.css'
import SuperDoubleRange from "../../common/elements/doubleRange/DoubleRange";


export const CardPacksPage = () => {

    let dispatch = useDispatch()
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)
    const myId = useAppSelector<string>(state => state.app._id)


    const [newName, setNewName] = useState<string>('') //add new pack input state
    const [searchName, setSearchName] = useState<string>('') //search pack input state
    const [value1, setValue1] = useState(settingSlider.min) //slider's state
    const [value2, setValue2] = useState(settingSlider.max) //slider's state
    const [value3, setValue3] = React.useState<number[]>([value1, value2]); //slider's state

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onSetNewSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        let searchName = e.currentTarget.value
        setSearchName(searchName)
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
    }

    const onGetPacks = () => {
        dispatch(getPacksTC())
    }

    const onGetMyPacks = () => {
        dispatch(getPacksTC(myId))
    }

    useEffect(() => {
        let searchTimer = setTimeout(() => dispatch(setSearchedNameAC(searchName)), 3000)
        return () => clearTimeout(searchTimer)
    }, [searchName])

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
                    <SuperButton onClick={onGetPacks}>Find</SuperButton>
                </div>
            </div>
            <div className={s.packsContainer}>
                <h1>Packs</h1>

                <div className={s.addNewPackInput}><input style={{border: '1px solid #C7A5A5', marginRight: '400px'}}
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
                <Pagination numberOfPagesInOnePortion={6}/>
            </div>

        </div>
    )
}

export default CardPacksPage;