import { type FC } from 'react';

import styles from './ChatMessage.module.css';

export const ChatMessage: FC<{ message: string; sender: string; time: string }> = ({
    message,
    sender,
    time,
}) => {
    const numericTime = Number(time);
    const date = Number.isFinite(numericTime)
        ? new Date(numericTime < 1_000_000_000_000 ? numericTime * 1000 : numericTime)
        : new Date(time);
    const formattedTime = Number.isNaN(date.getTime())
        ? ''
        : date.toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
          });

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
                <p>{formattedTime}</p>
            </div>
        </div>
    );
};
