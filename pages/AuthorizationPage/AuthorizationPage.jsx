import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthorizationPage.module.css';

export const AuthorizationPage = () => {
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const idInstance = form.idInstance.value;
        console.log(form.idInstance.value);
        const apiTokenInstance = form.apiTokenInstance.value;
        console.log(form.apiTokenInstance.value);
        // // функции, которые будут выполнены в случае правильного
        // // и неправильного ввода пароля для авторизации
        // const success = () => navigate('chat', { replace: true });
        // const failure = () => setInvalid(true);
        // login(idInstance, apiTokenInstance, success, failure);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input name='idInstance' placeholder='idInstance' required />
                    <input name='apiTokenInstance' placeholder='apiTokenInstance' required />
                    <button type='submit'>Войти</button>
                </form>
                {invalid && <p style={{ color: 'red' }}>Неверный пароль</p>}
            </div>
        </div>
    );
};
