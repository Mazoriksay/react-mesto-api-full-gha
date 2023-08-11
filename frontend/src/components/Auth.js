import React from "react";

function Auth({title, btnValue, formName, children, onSubmit, onChange, email, password}) {
   
    return (
        <div className='auth'>
            <form className='auth__form' name={formName} onSubmit={onSubmit}>
                <h2 className='auth__title'>{title}</h2>
                <input
                    className='auth__input'
                    type='text'
                    name='email'
                    placeholder='Email'
                    required={true}
                    minLength='2'
                    maxLength='40'
                    value={email || ''}
                    onChange={onChange}
                >
                </input>
                <input
                    className='auth__input'
                    type='password'
                    name='password'
                    placeholder='Пароль'
                    required={true}
                    minLength='6'
                    maxLength='40'
                    value={password || ''}
                    onChange={onChange}
                ></input>
                <input className='auth__button' type='submit' value={btnValue}></input>
                {children}
            </form>
        </div>
    ) 
}

export default Auth;