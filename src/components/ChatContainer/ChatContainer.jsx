import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useGetMessage } from '../../hooks/useGetMessage';
import { axiosInstance } from '../../helpers/axios';
import { useInputValue } from '../../hooks/useInput';
import { getApiLink } from '../../helpers/api/getApiLink';

export const ChatContainer = ({ user }) => {
    const [value, setValue] = useInputValue('');
    const [messages, setMessages] = useState([]);

    const chatBox = useRef(null);

    const handlePressKey = (event) => {
        if (event.code === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        axiosInstance
            .post(getApiLink('getChatHistory'), {
                chatId: `${user}`,
                count: 10,
            })
            .then((response) => {
                setMessages(response.data.reverse());
            })
            .catch((error) => console.log(error));
    }, [user]);

    useGetMessage(user, setMessages, messages);

    const sendMessage = async () => {
        const response = await axiosInstance.post(getApiLink('sendMessage'), {
            chatId: `${user}`,
            message: `${value}`,
        });
        setMessages([
            ...messages,
            {
                type: 'outgoing',
                idMessage: response.data.idMessage,
                timestamp: Date.now(),
                textMessage: `${value}`,
            },
        ]);
        setValue('');
    };

    useEffect(() => {
        chatBox.current.scroll({ top: chatBox.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
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
            <div className={styles.chatInput}>
                <input
                    onChange={setValue}
                    onKeyDown={handlePressKey}
                    placeholder='Введите сообщение'
                    type='text'
                    value={value}
                />
                <button className={styles.chatInputSendBtn} onClick={sendMessage}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
