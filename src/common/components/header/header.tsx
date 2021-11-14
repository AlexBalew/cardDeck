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
                    <Link to='/login'>login</Link>
                    <Link to='/registration'>registration</Link>
                    <Link to='/profile'>profile</Link>
                    <Link to='/restore-password'>restore password</Link>
                    <Link to='/new-password'>new password</Link>
                    <Link to='/test'>test elements</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header
