import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Auth from './Auth';
import { auth } from '../utils/AuthApi'


function Login({handleLogin}) {
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
        .catch(err => console.log(err));
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