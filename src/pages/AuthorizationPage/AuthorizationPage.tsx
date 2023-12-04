import { type FC, type KeyboardEventHandler } from 'react';

import styles from './AuthorizationPage.module.css';
import { useAuthorization } from '../../hooks/useAithorization';
import { useAppSelector } from '../../store/index.js';

export const AuthorizationPage: FC = () => {
    const { handleSubmit, idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance } =
        useAuthorization();
    const invalid = useAppSelector((store) => store.contacts.error);
    const isLoading = useAppSelector((store) => store.contacts.isLoading);

    const handlePressKey: KeyboardEventHandler<HTMLInputElement> = async (event) => {
        if (event.code === 'Enter') {
            await handleSubmit;
        }
    };

    return (
        <div className={styles.container}>
            <h1>Авторизация</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    name='idInstance'
                    onChange={setIdInstance}
                    placeholder='idInstance'
                    required
                    value={idInstance}
                />
                <input
                    className={styles.input}
                    name='apiTokenInstance'
                    onChange={setApiTokenInstance}
                    onKeyDown={handlePressKey}
                    placeholder='apiTokenInstance'
                    required
                    value={apiTokenInstance}
                />
                <button className={isLoading ? styles.buttonLoading : styles.button} type='submit'>
                    Войти
                </button>
            </form>
            {invalid && <p style={{ color: 'red' }}>{invalid}</p>}
        </div>
    );
};
