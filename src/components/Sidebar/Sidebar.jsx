import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { apiTokenInstance, idInstance, toLocalStorage } from '../../helpers/helpers.js';
import { instance } from '../../helpers/axios/index.js';

export const Sidebar = () => {
    const [value, setValue] = useState('');
    const [user, setUser] = useState('');
    const [invalid, setInvalid] = useState(false);
    const API_CHECK = `/waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`;

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const startChat = async (event) => {
        event.preventDefault();

        const checking = await instance
            .post(API_CHECK, {
                phoneNumber: `${value}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp === true) {
                    toLocalStorage('phone', value);
                    setInvalid(false);
                    setUser(value);
                    setValue('');
                } else {
                    setInvalid(true);
                    setValue('');
                }
            })
            .catch((error) => {
                setInvalid(true);
                setUser('');
                console.log(error.message);
                setValue('');
            });
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>id пользователя: {idInstance}</div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarForm} onSubmit={startChat}>
                    <input
                        type='phone'
                        name='user'
                        placeholder='79996663311'
                        autoFocus='autofocus'
                        value={value}
                        required
                        size={10}
                        onChange={handleChange}
                    />
                    <button type='submit' className={styles.startChat}>
                        >
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>номер не найден</p>}
            <div className={styles.sidebarChatList}>
                {user && <div className={styles.user}>{user}</div>}
            </div>
        </div>
    );
};
