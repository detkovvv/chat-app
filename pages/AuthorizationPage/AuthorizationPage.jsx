import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthorizationPage.module.css';

export const AuthorizationPage = () => {
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;
        // функции, которые будут выполнены в случае правильного
        // и неправильного ввода пароля для авторизации
        const success = () => navigate('chat', { replace: true });
        const failure = () => setInvalid(true);
        login(password, success, failure);
    };

    return (
        <div className={styles.wrapper}>
            <h1>Log in</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    idInstance: <input name='idInstance' />
                </label>
                <label>
                    apiTokenInstance: <input name='apiTokenInstance' />
                </label>
                <button type='submit' onClick={() => navigate('chat', { replace: true })}>
                    Login
                </button>
            </form>
            {invalid && <p style={{ color: 'red' }}>Неверный пароль</p>}
        </div>
    );
};
