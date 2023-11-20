import { type FC, type KeyboardEventHandler } from 'react';

import styles from './AuthorizationPage.module.css';
import { useAuthorization } from '../../hooks/useAithorization';

export const AuthorizationPage: FC = () => {
    const {
        handleSubmit,
        invalid,
        idInstance,
        apiTokenInstance,
        setIdInstance,
        setApiTokenInstance,
    } = useAuthorization();

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
                <button className={styles.button} type='submit'>
                    Войти
                </button>
            </form>
            {invalid && <p style={{ color: 'red' }}>Ошибка авторизации</p>}
        </div>
    );
};
