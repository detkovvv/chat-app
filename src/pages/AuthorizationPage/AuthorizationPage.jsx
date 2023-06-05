import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthorizationPage.module.css';
import { toLocalStorage } from '../../helpers/localStorage';
import { axiosInstance } from '../../helpers/axios/index';
import { getApiLink } from '../../helpers/getApiLink';


export const AuthorizationPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosInstance.get(
                getApiLink('getStateInstance', idInstance, apiTokenInstance),
            );
            if (data.stateInstance === 'authorized') {
                setInvalid(false);
                navigate('/', { replace: true });
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
        setIsLoggedIn(true);
    };

    return (
        <div className={styles.wrapper}>
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
