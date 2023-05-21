import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const startChat = () => {};
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}></div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarSearchInput} onSubmit={startChat}>
                    <input
                        type='text'
                        name='search'
                        placeholder='Поиск...'
                        onChange={(e) => e.target.value}
                    />
                    <button type='submit'>></button>
                </form>
            </div>
            <div className={styles.sidebarChatList}></div>
        </div>
    );
};
