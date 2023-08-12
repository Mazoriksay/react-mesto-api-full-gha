import { useState }from "react";
import Auth from "./Auth"
import { auth } from "../utils/AuthApi"
import { Link, useNavigate } from "react-router-dom";
import ok from "../images/galochka.svg";
import notOk from "../images/krestik.svg";

function Register({ openInfoTooltip, insertAlarm }) {
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
        auth.register(formValue).then(() => {
            insertAlarm({logo: ok, text: 'Вы успешно зарегистрировались!'});
            navigate('/sign-in', {replace:true});
        })
        .catch(() => {
            insertAlarm({logo: notOk, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
        })
        .finally(() => openInfoTooltip());
    }

    return (
        <>
        <Auth
            title='Регистрация'
            btnValue='Зарегистрироваться'
            formName='reg'
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={formValue.email}
            password={formValue.password}
        >
            <Link className='auth__crossing' to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </Auth>
        
        </>
    )
}

export default Register;