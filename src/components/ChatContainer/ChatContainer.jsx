import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { axiosInstance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';
import { apiLocalStorage, idLocalStorage } from '../../helpers/localStorage.js';
import { useGetMessage } from '../../hooks/useGetMessage.js';

// eslint-disable-next-line react/prop-types
export const ChatContainer = ({ user }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleKey = (event) => {
        if (event.code === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        axiosInstance
            .post(getApiLink('getChatHistory', idLocalStorage, apiLocalStorage), {
                chatId: `${user}@c.us`,
                count: 10,
            })
            .then((response) => {
                console.log(response.data);
                setMessages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    useGetMessage(user, setMessages, messages);

    const sendMessage = async () => {
        const response = await axiosInstance.post(
            getApiLink('sendMessage', idLocalStorage, apiLocalStorage),
            {
                chatId: `${user}@c.us`,
                message: `${value}`,
            },
        );
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
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
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
                        message={message.textMessage}
                        sender={message.type}
                        key={message.idMessage}
                        time={message.timestamp}
                    />
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    type='text'
                    placeholder='Введите сообщение'
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                />
                <button className={styles.chatInputSendBtn} onClick={sendMessage}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
