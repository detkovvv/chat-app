import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { instance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';
import { apiTokenInstance, idInstance } from '../../helpers/helpers.js';

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

    const source = new EventSource(
        'https://api.green-api.com/waInstance1101824700/ReceiveNotification/64e545ac9eb647248b2e5210f305be41fb43d047e42c4d40ad',
    );
    source.addEventListener('bye', function (e) {
        console.log(e.data);
    });

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

    const getMessage = async () => {
        const { data } = await instance
            .get(getApiLink('ReceiveNotification', idInstance, apiTokenInstance))
            .catch(() => {
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
            instance
                .delete(
                    getApiLink('deleteNotification', idInstance, apiTokenInstance, data.receiptId),
                )
                .catch((error) => {
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
                <button className={styles.chatInputSendBtn} onClick={getMessage}>
                    Получить
                </button>
            </div>
        </div>
    );
};
