import React from 'react';
import styles from './ChatMessage.module.css';

export const ChatMessage = ({ message, time, sender }) => {
    const idInstance = localStorage.getItem('idInstance');
    return (
        <div
            className={styles.chatMessage}
            style={{
                alignSelf: sender === idInstance ? 'flex-end' : 'flex-start',

                backgroundColor: sender == idInstance ? '#dcf8c6' : '#fff',
            }}
        >
            <div className={styles.chatMessageText}>
                <p>{message}</p>
            </div>
            <div className={styles.chatMessageDate}>
                <p>{new Date(time.toDate()).toLocaleString()}</p>
            </div>
        </div>
    );
};
