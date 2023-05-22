import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { idInstance, toLocalStorage } from '../../helpers/helpers.js';
import axios from 'axios';

export const Sidebar = () => {
    const [user, setUser] = useState('');
    const [invalid, setInvalid] = useState(false);
    const API_SEND = {};

    const startChat = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.get(API_AUTH);
            if (!data) {
                toLocalStorage('phone', user);
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
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button type='submit' className={styles.startChat}>
                        >
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>пользователь не найден</p>}
            <div className={styles.sidebarChatList}>
                {user && <div className={styles.user}>{user}</div>}
            </div>
        </div>
    );
};
