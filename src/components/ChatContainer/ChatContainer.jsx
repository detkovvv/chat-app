import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useGetMessage } from '../../hooks/useGetMessage';
import { axiosInstance } from '../../helpers/axios';
import { useInputValue } from '../../hooks/useInput';
import {getApiLink} from "../../helpers/api/getApiLink";

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
        const response = await axiosInstance.post(
            getApiLink('sendMessage'),
            {
                chatId: `${user}`,
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
                    onChange={setValue}
                    onKeyDown={handlePressKey}
                />
                <button className={styles.chatInputSendBtn} onClick={sendMessage}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
