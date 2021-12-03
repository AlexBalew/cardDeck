import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {CardPackType} from "../../api/packs-api";
import {deletePackTC, getPacksTC, updatePackTC} from "./cardPacks-reducer";
import s from './table.module.css'
import btn from '../cards/card/Card.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../app/Routes";
import SuperButton from "../../common/elements/button/SuperButton";
import {DeleteModal} from "../../common/components/modal/deleteModal/deleteModal";
import {UpdatePackTitleModal} from "../../common/components/modal/updatePackTitleModal/updatePackTitleModal";
import {LearningPageModal} from "../../common/components/modal/learningPage/learningPageModal";


export const CardPacksTable = React.memo(() => {

    let dispatch = useDispatch()

    let titles = ['Name', 'Cards count', 'Last updated', 'Created by', 'Actions']

    const packs = useAppSelector<CardPackType[]>(state => state.packs.cardPacks)
    const pageCount = useAppSelector<number>(state => state.packs.pageCount)
    //const page = useAppSelector<number>(state => state.packs.page)
    const myId = useAppSelector<string>(state => state.app._id)
    const searchedName = useAppSelector<string>(state => state.packs.searchedName)
    const settingSlider = useAppSelector<{ min: number; max: number }>(state => state.packs.settingSlider)

    const [open, setOpen] = useState<string>('')
    const [openT, setOpenT] = useState<string>('')
    const [openL, setOpenL] = useState<string>('')

    useEffect(() => {
        dispatch(getPacksTC())
        console.log('Main useEffect(table)')
    }, [pageCount, searchedName, settingSlider.min, settingSlider.max])

    return (
        <div className={s.mainContainer}>
            <table className={s.table}>
                <thead className={s.tableHead}>
                <tr>
                    {titles.map((title, index) => <th key={title + index} className={s.title}>{title}</th>)}
                </tr>
                </thead>
                <tbody className={s.tableBody}>
                {packs.map(pack => {
                        const onDeletePack = () => {
                            dispatch(deletePackTC(pack._id))
                            setOpen('')
                        }
                        const onUpdatePack = (newPackName?: string) => {
                            dispatch(updatePackTC(pack._id, newPackName))
                        }
                        return <tr className={s.dataRow} key={pack._id}>
                            <td>
                                <NavLink to={PATH.CARDS + `/${pack._id}`}>{pack.name}</NavLink>
                            </td>
                            <td>{pack.cardsCount}</td>
                            <td>{pack.updated}</td>
                            <td>{pack.user_name}</td>
                            {pack.user_id === myId
                                ?
                                <>
                                    <DeleteModal message={'Delete this pack?'}
                                                 isOpen={open === pack._id}
                                                 onClose={() => setOpen('')}
                                                 packId={pack._id}
                                                 onDelete={onDeletePack}
                                    />
                                    <UpdatePackTitleModal message={'Change the title of the pack'}
                                                          isOpen={openT === pack._id}
                                                          onClose={() => setOpenT('')}
                                                          onEdit={onUpdatePack}
                                    />
                                    {(openL === pack._id) && <LearningPageModal isOpen={openL === pack._id}
                                                                              onClose={() => setOpenL('')}
                                                                              packId={pack._id}
                                    />}
                                    <td>
                                        <SuperButton
                                            className={btn.btn}
                                            onClick={() => setOpen(pack._id)}
                                            value={pack._id}
                                        >
                                            delete
                                        </SuperButton>
                                        <SuperButton
                                            className={btn.btn}
                                            onClick={() => setOpenT(pack._id)}
                                            value={pack._id}
                                        >
                                            edit
                                        </SuperButton>
                                        <SuperButton className={btn.btn}
                                                     onClick={() => setOpenL(pack._id)}
                                                     value={pack._id}
                                        >
                                            learn
                                        </SuperButton>
                                    </td>
                                </>
                                :
                                <>
                                    {openL === pack._id ? <LearningPageModal isOpen={openL === pack._id}
                                                                              onClose={() => setOpenL('')}
                                                                              packId={pack._id}
                                    /> : null
                                    }
                                    <td>
                                        <SuperButton className={btn.btn}
                                                     onClick={() => setOpenL(pack._id)}
                                                     value={pack._id}
                                        >
                                            learn
                                        </SuperButton>
                                    </td>
                                </>
                            }
                        </tr>
                    }
                )}
                </tbody>
            </table>

        </div>
    )
})