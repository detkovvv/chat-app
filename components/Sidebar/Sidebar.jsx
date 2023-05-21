import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const idInstance = localStorage.getItem('idInstance');
    const [user, setUser] = useState('');
    const memory = (key, value) => localStorage.setItem(key, value);

    const startChat = (event) => {
        event.preventDefault();
        memory('phone', user);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>User: {idInstance}</div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarSearchInput} onSubmit={startChat}>
                    <input
                        type='text'
                        name='user'
                        placeholder='79996663311'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button type='submit' className={styles.startChat}>
                        >
                    </button>
                </form>
            </div>
            <div className={styles.sidebarChatList}>
                {user && <div className={styles.user}>{user}</div>}
            </div>
        </div>
    );
};
