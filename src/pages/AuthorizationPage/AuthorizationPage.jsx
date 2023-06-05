import React, { useState } from 'react';
import styles from './AuthorizationPage.module.css';
import { useAuthorization } from '../../hooks/useAithorization';

export const AuthorizationPage = () => {
    const { form, handleSubmit, invalid, handleChange, idInstance, apiTokenInstance } =
        useAuthorization();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        name='idInstance'
                        placeholder='idInstance'
                        required
                        onChange={handleChange}
                        value={idInstance}
                    />
                    <input
                        name='apiTokenInstance'
                        placeholder='apiTokenInstance'
                        required
                        onChange={handleChange}
                        value={apiTokenInstance}
                    />
                    <button type='submit'>Войти</button>
                </form>
                {invalid && <p style={{ color: 'red' }}>Ошибка авторизации</p>}
            </div>
        </div>
    );
};
