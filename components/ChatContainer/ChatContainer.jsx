import React, { useEffect, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { API_URL } from '../../helpers/api.js';

export const ChatContainer = () => {
    const idInstance = localStorage.getItem('idInstance');
    const apiTokenInstance = localStorage.getItem('apiTokenInstance');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const API_SEND = API_URL + `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const send = (e) => {
        e.preventDefault();
    };
    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <div className={styles.chatUserImg}></div>
                    <p></p>
                </div>

                <div className={styles.chatContainerHeaderBtn}></div>
            </div>
            <div className={styles.chatDisplayContainer}>
                {chatMessages.map((message) => (
                    <ChatMessage
                        message={message.text}
                        time={message.timeStamp}
                        sender={message.senderEmail}
                    />
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
