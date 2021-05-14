import React from 'react'

export const AuthFormControl = () => {
    // const {title}
    return (
        <div className="auth-form-control auth-form-control--username">
            <label className="auth-form__label">
                Username
            </label>
            <input name="username" className="auth-form__input" type="text" required/>
        </div>
    )
}
