import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { instance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';

// eslint-disable-next-line react/prop-types
export const ChatContainer = ({ user, chatMessages }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState(chatMessages ? chatMessages : []);

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const sendMessage = async () => {
        const response = await instance.post(getApiLink('sendMessage'), {
            chatId: `${user}@c.us`,
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
        console.log(messages);
    };

    const getMessage = async () => {
        const { data } = await instance.get(getApiLink('ReceiveNotification')).catch(() => {
            console.log('нет входящих сообщений');
        });
        if (data != null) {
            if (data.body.senderData.sender === `${user}@c.us`) {
                setMessages([
                    ...messages,
                    {
                        type: 'incoming',
                        idMessage: data.body.idMessage,
                        timestamp: data.body.timestamp,
                        textMessage: data.body.messageData.textMessageData.textMessage,
                    },
                ]);
            }
            instance.delete(getApiLink('deleteNotification', data.receiptId)).catch((error) => {
                console.log(error);
            });
        }
    };

    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }, [messages]);

    return (
        <div className={styles.chatContainer} user={user}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {messages.map((message) => (
                    <ChatMessage
                        {...chatMessages}
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
                />
                <button className={styles.chatInputSendBtn} onClick={sendMessage}>
                    Отправить
                </button>
                <button className={styles.chatInputSendBtn} onClick={getMessage}>
                    Получить
                </button>
            </div>
        </div>
    );
};
