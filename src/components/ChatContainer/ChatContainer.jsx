import React, { useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { apiTokenInstance, idInstance, user } from '../../helpers/helpers.js';
import { instance } from '../../helpers/axios/index.js';

export const ChatContainer = () => {
    const [value, setValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const API_SEND = `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

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
                setMessage(value);
                setChatMessages();
                setValue('');
            });
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer}>
                {/*{chatMessages.map(() => (*/}
                <ChatMessage message={message} />
                {/*))}*/}
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
