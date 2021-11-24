import React, {ChangeEvent, useState} from "react";
import {CardPacksTable} from "./table";
import s from './cardPacksPage.module.css';
import Pagination from "../../common/components/pagination/pagination";
import SuperButton from "../../common/elements/button/SuperButton";
import {useDispatch} from "react-redux";
import {createPackTC, getPacksTC} from "./cardPacks-reducer";
import {useAppSelector} from "../../bll/store";
import SuperDoubleRange from "../../common/elements/doubleRange/DoubleRange";
import style from '../../common/elements/doubleRange/DoubleRange.module.css'


export const CardPacksPage = () => {

    let dispatch = useDispatch()

    const [newName, setNewName] = useState<string>('')
    const [value1, setValue1] = useState(50)
    const [value2, setValue2] = useState(100)
    const [value3, setValue3] = React.useState<number[]>([value1, value2]);

    const myId = useAppSelector<string>(state => state.app._id)

    const onSetNewName = (e: ChangeEvent<HTMLInputElement>) => {
        let newName = e.currentTarget.value
        setNewName(newName)
    }

    const onClickNewName = (newName: string) => {
        dispatch(createPackTC(newName))
        setNewName('')
    }

    const onGetAllPacks = () => {
        dispatch(getPacksTC())
    }

    const onGetMyPacks = () => {
        dispatch(getPacksTC(myId))
    }

    return (

        <div className={s.container}>
            <div className={s.filterContainer}>
                <div>Show packs</div>
                <SuperButton onClick={onGetMyPacks}>My packs</SuperButton>
                <SuperButton onClick={onGetAllPacks}>All packs</SuperButton>
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
                    <span className={style.span}>{value1 < value2 ? value1 : value2-1}</span>
                </div>
            </div>
            <div className={s.packsContainer}>
                <h1>Packs</h1>
                <div className={s.addNewPackInput}><input style={{border: '1px solid #C7A5A5'}}
                                                          onChange={onSetNewName}
                                                          value={newName}
                                                          placeholder={'insert title here'}/></div>
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