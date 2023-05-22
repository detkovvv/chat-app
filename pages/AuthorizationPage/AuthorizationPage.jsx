import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthorizationPage.module.css';
import axios from 'axios';
import { API_URL } from '../../helpers/api.js';
import { toLocalStorage } from '../../helpers/helpers.js';

export const AuthorizationPage = ({ ...props }) => {
    const navigate = useNavigate();
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [invalid, setInvalid] = useState(false);
    const API_AUTH = API_URL + `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(API_AUTH);
            if (data.stateInstance === 'authorized') {
                setInvalid(false);
                navigate('chat', { replace: true });
                toLocalStorage('idInstance', idInstance);
                toLocalStorage('apiTokenInstance', apiTokenInstance);
            } else {
                setInvalid(true);
            }
        } catch (e) {
            if (e instanceof Error) {
                setInvalid(true);
            }
        }
    };

    return (
        <div className={styles.wrapper} {...props}>
            <div className={styles.container}>
                <h1>Авторизация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        name='idInstance'
                        placeholder='idInstance'
                        required
                        onChange={(e) => setIdInstance(e.target.value)}
                        value={idInstance}
                    />
                    <input
                        name='apiTokenInstance'
                        placeholder='apiTokenInstance'
                        required
                        onChange={(e) => setApiTokenInstance(e.target.value)}
                        value={apiTokenInstance}
                    />
                    <button type='submit'>Войти</button>
                </form>
                {invalid && <p style={{ color: 'red' }}>Ошибка авторизации</p>}
            </div>
        </div>
    );
};
