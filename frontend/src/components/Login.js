import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import { auth } from '../utils/AuthApi';
import notOk from "../images/krestik.svg";


function Login({ handleLogin, openInfoTooltip, insertAlarm }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const {name, value} = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        auth.authorize(formValue).then((data) => {
            handleLogin(formValue.email);
            setFormValue({email: '', password: ''});
            navigate('/', {replace: true});   
     
        })
        .catch(() => {
            insertAlarm({logo: notOk, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
            openInfoTooltip();
        });
    }

    return (
        <Auth   
            title='Вход'
            btnValue='Войти'
            formName='login'
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={formValue.email}
            password={formValue.password}
        />
    )
}

export default Login;