import React from 'react';
import '../index.css'
import headerLogo from '../images/logo/header__logo.svg';
import {Link, useLocation} from 'react-router-dom';




function Header({email, onSignOut}) {
    const location = useLocation()
    return (
        <header className="header">
            <a href="#"><img src={headerLogo} className="header__logo" alt="Логотип Место"/></a>
            {location.pathname === '/' && (
                 <div className="header__container">
                    <p className='header__email'>{email}</p>
                    <Link className='header__auth' onClick={onSignOut}>Выйти</Link>
                </div>
            )}    
            {location.pathname === '/sign-in' && (
                <Link className="header__auth" to={'/sign-up'}>Регистрация</Link>
            )}
            {location.pathname === '/sign-up' && (
                <Link className="header__auth" to={'/sign-in'}>Вход</Link>
            )}
        </header>
    )
}

export default Header;