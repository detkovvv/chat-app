import React from 'react';
import styles from './ChatMessage.module.css';

// eslint-disable-next-line react/prop-types
export const ChatMessage = ({ message, sender }) => {
    return (
        <div
            className={styles.chatMessage}
            style={{
                alignSelf: sender === 'you' ? 'flex-end' : 'flex-start',

                backgroundColor: sender === 'you' ? '#dcf8c6' : '#fff',
            }}
        >
            <div className={styles.chatMessageText}>
                <p>{message}</p>
            </div>
            <div className={styles.chatMessageDate}>
                <p>{sender}</p>
            </div>
        </div>
    );
};
