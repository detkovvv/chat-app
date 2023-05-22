import React from 'react';
import styles from './ChatMessage.module.css';
import { currentTime, idInstance } from '../../helpers/helpers.js';

export const ChatMessage = ({ message, sender }) => {
    return (
        <div
            className={styles.chatMessage}
            style={{
                alignSelf: sender === idInstance ? 'flex-end' : 'flex-start',

                backgroundColor: sender === idInstance ? '#dcf8c6' : '#fff',
            }}
        >
            <div className={styles.chatMessageText}>
                <p>{message}</p>
            </div>
            <div className={styles.chatMessageDate}>
                <p>{currentTime}</p>
            </div>
        </div>
    );
};
