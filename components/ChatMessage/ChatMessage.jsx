import React from 'react';
import styles from './ChatMessage.module.css';

export const ChatMessage = ({ message, time, sender }) => {
    return (
        <div className={styles.chatMessage}>
            <div className={styles.chatMessageText}>
                <p>{message}</p>
            </div>
            <div className={styles.chatMessageDate}>
                <p>{new Date(time.toDate()).toLocaleString()}</p>
            </div>
        </div>
    );
};
