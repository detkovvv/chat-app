import { type FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthorizationPage.module.css';
import { useAuthorization } from '../../hooks/useAithorization';
import { useAppSelector } from '../../store/index.js';

export const AuthorizationPage: FC = () => {
    const { handleSubmit, idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance } =
        useAuthorization();
    const invalid = useAppSelector((store) => store.contacts.error);
    const isLoading = useAppSelector((store) => store.contacts.isLoading);

    return (
        <div className={styles.container}>
            <h1>Подключение Green API</h1>
            <p>Введите данные своего экземпляра. Они хранятся только до закрытия вкладки.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor='idInstance'>ID Instance</label>
                <input
                    className={styles.input}
                    id='idInstance'
                    name='idInstance'
                    onChange={setIdInstance}
                    placeholder='ID Instance'
                    required
                    value={idInstance}
                />
                <label htmlFor='apiTokenInstance'>API Token Instance</label>
                <input
                    className={styles.input}
                    id='apiTokenInstance'
                    name='apiTokenInstance'
                    onChange={setApiTokenInstance}
                    placeholder='API Token Instance'
                    required
                    type='password'
                    value={apiTokenInstance}
                />
                <button className={isLoading ? styles.buttonLoading : styles.button} disabled={isLoading} type='submit'>
                    {isLoading ? 'Подключение...' : 'Войти'}
                </button>
            </form>
            {invalid && <p style={{ color: 'red' }}>{invalid}</p>}
            <Link className={styles.demoLink} to='/demo'>Вернуться в деморежим</Link>
        </div>
    );
};
