import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { instance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';

export const ChatContainer = ({ user, chatMessages }) => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState(chatMessages);

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const send = async (event) => {
        event.preventDefault();
        await instance
            .post(getApiLink('sendMessage'), {
                chatId: `${user}@c.us`,
                message: `${value}`,
            })
            .then((response) => {
                setMessages([
                    ...messages,
                    {
                        type: 'outgoing',
                        idMessage: response.data.idMessage,
                        timestamp: 1685016338,
                        textMessage: `${value}`,
                    },
                ]);
            });
        setValue('');
        console.log(messages);
    };

    const getMessage = async () => {
        await instance
            .get(getApiLink('ReceiveNotification'))
            .then((response) => {
                if (response.data != null) {
                    if (response.data.body.senderData.sender === `${user}@c.us`) {
                        setMessages([
                            ...messages,
                            {
                                type: 'incoming',
                                idMessage: response.data.body.idMessage,
                                timestamp: response.data.body.timestamp,
                                textMessage:
                                    response.data.body.messageData.textMessageData.textMessage,
                            },
                        ]);
                    }
                    instance
                        .delete(getApiLink('deleteNotification', response.data.receiptId))
                        .then((response) => console.log(response.data))
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch(() => {
                console.log('нет входящих сообщений');
            });
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
                <div className={styles.chatInputBtn}></div>
                <form onSubmit={send}>
                    <input
                        type='text'
                        placeholder='Введите сообщение'
                        value={value}
                        onChange={handleChange}
                    />
                    <button className={styles.chatInputSendBtn} type='submit'>
                        Отправить
                    </button>
                </form>
                <button className={styles.chatInputSendBtn} type='submit' onClick={getMessage}>
                    Получить
                </button>
            </div>
        </div>
    );
};
