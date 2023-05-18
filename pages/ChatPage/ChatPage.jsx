import React from 'react';
import styles from './ChatPage.module.css';

export const ChatPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div>список чатов</div>
                <div>окно чата</div>
            </div>
        </div>
    );
};
