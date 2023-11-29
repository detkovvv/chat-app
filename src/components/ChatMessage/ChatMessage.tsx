import { type FC } from 'react';

import styles from './ChatMessage.module.css';

export const ChatMessage: FC<{ message: string; sender: string; time: string }> = ({
    message,
    sender,
    time,
}) => {
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
                <p>{new Date(time).toLocaleTimeString()}</p>
            </div>
        </div>
    );
};
