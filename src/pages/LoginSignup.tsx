import React, { useState } from 'react';
import GoogleIcon from '../assets/svgs/GoogleIcon';
import Logo from '../assets/imgs/Logo.png';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export function LoginSignup() {
    const [loginSelected, setLoginSelected] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();


    function toggleForm() {
        setLoginSelected(prev => !prev);
        setErrorMessage(null);
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setErrorMessage(null);
        try {
            const tokens = await authService.login(email, password);
            console.log('Login successful:', tokens);
            navigate('/')
        } catch (err: unknown) {
            setErrorMessage('An unexpected error occurred during login.');
        }
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setErrorMessage(null);
        try {
            const user = await authService.register(email, password, confirmPassword);
            console.log('Registration successful:', user);
            navigate('/')
        } catch (err: unknown) {
            setErrorMessage('An unexpected error occurred during registration.');
        }
    }

    return (
        <section className='main-login'>
            <div className='logo-container'>
                <img className='logo' src={Logo} alt="Logo" />
            </div>
            {loginSelected ? (
                <div className='login-container'>
                    <h1>Welcome!</h1>
                    <p className='subtitle'>
                        <a className='signin' onClick={toggleForm}>Create a free account</a> or log in to get started
                    </p>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <form className='login-form' onSubmit={handleLogin}>
                        <input type='text' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                </div>
            ) : (
                <div className='login-container'>
                    <h1>Register</h1>
                    <p className='subtitle'>Already have an account? <a className='signin' onClick={toggleForm}>Log in</a></p>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <form className='login-form' onSubmit={handleRegister}>
                        <input type='text' placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type='submit' className='signin-button'>Sign Up</button>
                    </form>
                </div>
            )}
        </section>
    );
}
