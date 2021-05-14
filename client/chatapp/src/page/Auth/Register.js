import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import './auth.css';
import {register} from '../../store/actions/auth'

export const Register = ({history}) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(register({firstName, lastName, email, password}, history))
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth__left-side">
                    <form className="auth-form" onSubmit={submitForm}>
                        <h3 className="auth-form__title"> SignUp </h3>
                        <div className="auth-form-control auth-form-control--firstname">
                            <label className="auth-form__label">
                                First Name
                            </label>
                            <input 
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName} 
                                name="firstname"
                                className="auth-form__input"
                                type="text" 
                                required/>
                        </div>
                        <div className="auth-form-control auth-form-control--lastname">
                            <label className="auth-form__label">
                                Last Name
                            </label>
                            <input 
                                onChange={e => setLastName(e.target.value)}
                                value={lastName} 
                                name="lastname" 
                                className="auth-form__input" 
                                type="text" 
                                required/>
                        </div>
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
                        <button className="auth-form__button">Register</button>

                        <div className="login-signup">
                            <Link to="/login" className="login-signup__link"> 
                                    Already have an account? Sign In
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
