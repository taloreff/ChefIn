import React from 'react'
import Logo from '../assets/imgs/Logo.png';

export function AppHeader() {
    return (
        <header className='header'>
            <img src={Logo} alt="logo" />
        </header>
    )
}
