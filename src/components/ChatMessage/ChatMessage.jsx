import React from 'react';
import styles from './ChatMessage.module.css';

// eslint-disable-next-line react/prop-types
export const ChatMessage = ({ message, sender, time }) => {
    return (
        <div
            className={styles.chatMessage}
            style={{
                alignSelf: sender === 'outgoing' ? 'flex-end' : 'flex-start',

                backgroundColor: sender === 'outgoing' ? '#dcf8c6' : '#fff',
            }}
        >
            <div className={styles.chatMessageText}>
                <p>{message}</p>
            </div>
            <div className={styles.chatMessageDate}>
                <p>{time}</p>
            </div>
        </div>
    );
};

// {new Date(time.toDate()).toLocaleString()}
