import React, { useState } from 'react';
import GoogleIcon from '../assets/svgs/GoogleIcon';
import Logo from '../assets/imgs/Logo.png';

export function LoginSignup() {

    const [loginSelected, setLoginSelected] = useState(true);

    function toggleForm() {
        setLoginSelected(prev => !prev);
    }

    return (
        <section className='main-login'>
            <div className='logo-container'>
                <img className='logo' src={Logo} alt="Logo" />
            </div>
            {loginSelected ? <div className='login-container'>
                <h1>Welcome!</h1>
                <p className='subtitle'><a className='signin' onClick={toggleForm}>Create a free account</a> or log in to get started</p>
                <form className='login-form'>
                    <input type='text' placeholder='Email address' />
                    <input type='password' placeholder='Password' />
                    <div className='form-options'>
                        <label>
                            <input type='checkbox' />
                            Remember me
                        </label>
                        <a href="#" className='forgot-password'>Forgot password?</a>
                    </div>
                    <button type='submit' className='signin-button'>Sign in</button>
                </form>
                <button className='google-signin'>
                    <GoogleIcon />
                    <span>Sign in with Google</span>
                </button>
            </div> : (
                <div className='login-container'>
                    <h1>Register</h1>
                    <p className='subtitle'>Already have an account? <a className='signin' onClick={toggleForm}>Log in</a></p>
                    <form className='login-form'>
                        <input type='text' placeholder='Email address' />
                        <input type='password' placeholder='Password' />
                        <input type='password' placeholder='Confirm password' />
                        <button type='submit' className='signin-button'>Sign Up</button>
                    </form>
                </div>
            )}
        </section>
    );
}
