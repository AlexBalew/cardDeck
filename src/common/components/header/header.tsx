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
                    <Link to='/restore-password'>change password</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header
