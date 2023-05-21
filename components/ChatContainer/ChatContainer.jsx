import React, { useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { API_URL } from '../../helpers/api.js';
import axios from 'axios';

export const ChatContainer = () => {
    const user = localStorage.getItem('phone');
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const API_SEND = API_URL + `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    const send = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_SEND, message);
            return response.data;
        } catch (e) {
            console.error(e.toJSON());
        }
        setMessage('');
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>{user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer}>
                {chatMessages.map((message) => (
                    <ChatMessage message={message.text} time={message.timeStamp} />
                ))}
            </div>
            <div className={styles.chatInput}>
                <div className={styles.chatInputBtn}></div>
                <form onSubmit={send}>
                    <input
                        type='text'
                        placeholder='Введите сообщение'
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                    <button className={styles.chatInputSendBtn} type='submit'>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};
