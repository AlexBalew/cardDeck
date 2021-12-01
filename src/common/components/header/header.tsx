import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './header.module.css'
import {PATH} from "../../../app/Routes";
import CardsImg from '../../../assets/profile/cards.png'
import UserImg from '../../../assets/profile/user.png'


function Header() {

    return (
        <div className={s.headerContainer}>
            <div className={s.title}>
                <b>It-incubator</b>
            </div>
            <div className={s.navContainer}>
                <NavLink to={PATH.PACKS_LIST} className={s.navLink}>
                    <div className={s.navLinkContext}>
                        <img src={CardsImg} className={s.cardsImg}/>
                        <span>Packs list</span>
                    </div>
                </NavLink>


                <NavLink to={PATH.PROFILE} className={s.navLink}>
                    <div className={s.navLinkContext}>
                        <img src={UserImg} className={s.useImg}/>
                        <span>Profile</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Header
