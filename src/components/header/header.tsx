import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './header.module.css'

function Header() {
    return (
        <div className={s.body}>
            <div className={s.main}>
                <input type="checkbox"/>
                <div>
                    <span className="first"></span>
                    <span className="second"></span>
                    <span className="third"></span>
                </div>
                <nav className={s.menu}>
                    <NavLink to='/login'>login</NavLink>
                    <NavLink to='/registration'>registration</NavLink>
                    <NavLink to='/profile'>profile</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default Header
