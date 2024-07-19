import React from 'react'
import Logo from '../assets/imgs/logo_no_background2.png';
import { NavLink } from 'react-router-dom';
import { UserActions } from './UserActions';

export function AppHeader() {
    return (
        <header className='header'>
            <NavLink to={'/'}>
                <img className='logo' src={Logo} alt="logo" />
            </NavLink>
            <UserActions />
        </header>
    )
}
