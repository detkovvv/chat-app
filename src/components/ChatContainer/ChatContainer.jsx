import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { apiTokenInstance, currentTime, idInstance, user } from '../../helpers/helpers.js';
import { instance } from '../../helpers/axios/index.js';

export const ChatContainer = () => {
    const [value, setValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const API_SEND = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const API_GET = `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
    // const API_CLEAR = `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
    const [sender, setSender] = useState('');
    const chatBox = useRef(null);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const send = async (event) => {
        event.preventDefault();
        await instance
            .post(API_SEND, {
                chatId: `${user}@c.us`,
                message: `${value}`,
            })
            .then(() => {
                setSender('you');
                setMessage(value);
                setChatMessages([...chatMessages, value]);
            });
        setValue('');
    };
    setInterval(() => {
        const res = async () => {
            await instance.get(API_GET).then((response) => {
                if (response.data != null) {
                    console.log(receive.data);
                    setSender('to me');
                    setMessage(response.data.body.messageData.textMessageData.textMessage);
                    setChatMessages([...chatMessages, message]);
                }
            });
        };
    }, 3000);

    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }, [chatMessages]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {chatMessages.map((message) => (
                    <ChatMessage message={message} sender={sender} />
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
            </div>
        </div>
    );
};
