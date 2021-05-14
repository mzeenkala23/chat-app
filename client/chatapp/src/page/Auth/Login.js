import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import './auth.css';
import {login} from '../../store/actions/auth'

export const Login = ({history}) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('hello@gmail.com');
    const [password, setPassword] = useState('123456');

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(login({email, password}, history))
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth__left-side">
                    <form className="auth-form" onSubmit={submitForm}>
                        <h3 className="auth-form__title"> Login In </h3>
                        <div className="auth-form-control auth-form-control--email">
                            <label className="auth-form__label">
                                Email
                            </label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email} 
                                name="email" 
                                className="auth-form__input" 
                                type="email" 
                                required/>
                        </div>
                        <div className="auth-form-control auth-form-control--password">
                            <label className="auth-form__label">
                                Password
                            </label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password} 
                                className="auth-form__input" 
                                type="password" 
                                name="password" 
                                required/>
                        </div>    
                        <button className="auth-form__button">Login In</button>

                        <div className="login-signup">
                            <Link to="/register" className="login-signup__link"> 
                                    Don't have an account? Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="auth__right-side">
                </div>
            </div>
        </div>
    )
}
