import React from 'react'
import {Link} from 'react-router-dom'
import s from './header.module.css'

function Header() {


    return (
        <div className={s.body}>
            <div className={s.main}>
                <input type="checkbox"/>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={s.menu}>
                    <Link to='/profile'>profile</Link>
                    <Link to='/change-password'>change password</Link>
                    <Link to='/packs-list'>packs</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header
