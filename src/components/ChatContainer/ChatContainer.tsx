import { useEffect, useRef, type FC, useLayoutEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ChatContainer.module.css';
import { useGetMessage } from '../../hooks/useGetMessage.js';
import { useInputValue } from '../../hooks/useInput';
import { useAppSelector, CustomDispatch } from '../../store';
import { fetchChatHistory, sendMessage } from '../../store/asyncActions/chat.js';
import { ChatMessage } from '../ChatMessage/ChatMessage';

export const ChatContainer: FC<{ user: string }> = ({ user }) => {
    const navigate = useNavigate();
    const [value, handleChangeValue, clearValue] = useInputValue();
    const messages = useAppSelector((store) => store.chat.chatStore);

    const chatBox = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        CustomDispatch(fetchChatHistory(user));
    }, [user]);

    useGetMessage(user);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.trim()) return;
        CustomDispatch(sendMessage(user, value.trim()));
        clearValue();
    };

    useLayoutEffect(() => {
        if (chatBox.current) {
            const element = chatBox.current as HTMLDivElement;
            element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <button aria-label='К контактам' className={styles.backButton} onClick={() => navigate('/live')} type='button'>←</button>
                <div className={styles.chatUserInfo}>
                    <span aria-hidden='true' className={styles.avatar}>{user[0]}</span>
                    {user}
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {messages.map((message) => (
                    <ChatMessage
                        key={message.idMessage}
                        message={message.textMessage}
                        sender={message.type}
                        time={String(message.timestamp)}
                    />
                ))}
            </div>
            <form className={styles.chatInput} onSubmit={handleSendMessage}>
                <input
                    onChange={handleChangeValue}
                    placeholder='Введите сообщение'
                    type='text'
                    value={value}
                />
                <button className={styles.chatInputSendBtn} type='submit'>
                    Отправить
                </button>
            </form>
        </div>
    );
};
