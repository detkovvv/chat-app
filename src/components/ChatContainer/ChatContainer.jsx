import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { apiTokenInstance, idInstance, user } from '../../helpers/helpers.js';
import { instance } from '../../helpers/axios/index.js';

export const ChatContainer = () => {
    const [value, setValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('');
    const [receiptId, setReceiptId] = useState('');

    const API_SEND = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const API_GET = `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
    const API_CLEAR = `/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const send = async (event) => {
        setSender('you');
        event.preventDefault();
        await instance
            .post(API_SEND, {
                chatId: `${user}@c.us`,
                message: `${value}`,
            })
            .then(() => {
                setMessage(value);
                setChatMessages([...chatMessages, value]);
            });
        setValue('');
    };
    //отправка запроса на получение уведомления о новом сообщении и вывод сообщения
    // setInterval(() => {
    //     setSender('to me');
    //     const receiveNotification = async () => {
    //         await instance.get(API_GET).then((response) => {
    //             if (response.data != null) {
    //                 console.log(response.data);
    //                 setReceiptId(response.data.receiptId);
    //                 setMessage(response.data.body.messageData.textMessageData.textMessage);
    //                 setChatMessages([...chatMessages, message]);
    //             }
    //         });
    //     };
    // }, 3000);
    //отправка запроса на удаление уведомления
    // setInterval(() => {
    //     const deleteNotification = async () => {
    //         await instance.get(API_CLEAR).then((response) => console.log(response.data));
    //     };
    // }, 3001);

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
