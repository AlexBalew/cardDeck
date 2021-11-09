import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './header.module.css'

function Header() {
    return (
        <div className={s.body}>
            <div className={s.main}>
                <input type="checkbox"/>
                <div>
                    <span></span>
                    <span ></span>
                    <span ></span>
                </div>
                <nav className={s.menu}>
                    <NavLink to='/login'>login</NavLink>
                    <NavLink to='/registration'>registration</NavLink>
                    <NavLink to='/profile'>profile</NavLink>
                    <NavLink to='/restore-password'>restore password</NavLink>
                    <NavLink to='/new-password'>new password</NavLink>
                    <NavLink to='/test'>test comps</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Header
