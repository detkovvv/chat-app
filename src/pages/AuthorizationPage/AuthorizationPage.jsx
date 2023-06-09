import React from 'react';
import styles from './AuthorizationPage.module.css';
import { useAuthorization } from '../../hooks/useAithorization';

export const AuthorizationPage = () => {
    const {
        handleSubmit,
        invalid,
        idInstance,
        apiTokenInstance,
        setIdInstance,
        setApiTokenInstance,
    } = useAuthorization();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        name='idInstance'
                        onChange={setIdInstance}
                        placeholder='idInstance'
                        required
                        value={idInstance}
                    />
                    <input
                        name='apiTokenInstance'
                        onChange={setApiTokenInstance}
                        placeholder='apiTokenInstance'
                        required
                        value={apiTokenInstance}
                    />
                    <button type='submit'>Войти</button>
                </form>
                {invalid && <p style={{ color: 'red' }}>Ошибка авторизации</p>}
            </div>
        </div>
    );
};
