import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { apiTokenInstance, idInstance, toLocalStorage } from '../../helpers/helpers.js';
import axios from 'axios';
import { API_URL } from '../../helpers/api.js';

export const Sidebar = () => {
    const [user, setUser] = useState('');
    const [invalid, setInvalid] = useState(false);
    const API_CHECK = API_URL + `/waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`;

    const handleChange = (event) => {
        setUser(event.target.value);
    };

    const startChat = async (event) => {
        event.preventDefault();

        const checking = await axios
            .post(API_CHECK, {
                phoneNumber: `${user}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp === true) {
                    toLocalStorage('phone', user);
                    setInvalid(false);
                    setUser('');
                } else {
                    setInvalid(true);
                    setUser('');
                }
            })
            .catch((error) => {
                setInvalid(true);
                setUser('');
                console.log(error.message);
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
                        value={user}
                        required
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
