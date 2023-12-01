import { useEffect, useRef, type FC, useLayoutEffect, type KeyboardEventHandler } from 'react';
import { useSelector } from 'react-redux';

import styles from './ChatContainer.module.css';
import { useGetMessage } from '../../hooks/useGetMessage.js';
import { useInputValue } from '../../hooks/useInput';
import { CustomDispatch } from '../../store';
import { fetchChatHistory, sendMessage } from '../../store/asyncActions/chat.js';
import { ChatMessage } from '../ChatMessage/ChatMessage';

// TODO: переписать запросы через работу со store

export const ChatContainer: FC<{ user: string }> = ({ user }) => {
    const [value, handleChangeValue, clearValue] = useInputValue();
    const messages = useSelector((store) => store.chat.chatStore);

    const chatBox = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        CustomDispatch(fetchChatHistory(user));
    }, [user]);

    useGetMessage(user, messages);

    const handleSendMessage = (event) => {
        event.preventDefault();
        CustomDispatch(sendMessage(value, user));
        clearValue();
    };
    const handlePressKey: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.code === 'Enter') {
            CustomDispatch(sendMessage(value, user));
            clearValue();
        }
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
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {parseInt(user)}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {messages.map((message) => (
                    <ChatMessage
                        key={message.idMessage}
                        message={message.textMessage}
                        sender={message.type}
                        time={message.timestamp}
                    />
                ))}
            </div>
            <form className={styles.chatInput} onSubmit={handleSendMessage}>
                <input
                    onChange={handleChangeValue}
                    onKeyDown={handlePressKey}
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
