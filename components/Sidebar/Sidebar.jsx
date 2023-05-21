import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const idInstance = localStorage.getItem('idInstance');
    const [user, setUser] = useState('');

    const startChat = (event) => {
        event.preventDefault();
        setUser(value);
        localStorage.setItem('phone', value);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>User: {idInstance}</div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarSearchInput} onSubmit={startChat}>
                    <input
                        type='text'
                        name='search'
                        placeholder='79996663311'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button type='submit'> > </button>
                </form>
            </div>
            <div className={styles.sidebarChatList}>
                {user && <div className={styles.user}>{user}</div>}
            </div>
        </div>
    );
};
