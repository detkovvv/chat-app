import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { instance } from '../../helpers/axios/index';
import { getApiLink } from '../../helpers/getApiLink';
import { apiTokenInstance, idInstance } from '../../helpers/helpers';
import { useGetMessage } from '../../hooks/useGetMessage';

export const ChatContainer = ({ user }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState([]);

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleKey = async (event) => {
        if (event.code === 'Enter') {
            await sendMessage();
        }
    };

    useEffect(() => {
        instance
            .post(getApiLink('getChatHistory', idInstance, apiTokenInstance), {
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
        console.log(messages);
    }, [user]);

    useGetMessage(user, setMessages, messages);

    const sendMessage = async () => {
        const response = await instance.post(
            getApiLink('sendMessage', idInstance, apiTokenInstance),
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
        console.log(messages);
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
