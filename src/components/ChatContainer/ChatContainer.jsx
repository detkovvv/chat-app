import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';
import { ChatMessage } from '../ChatMessage/ChatMessage.jsx';
import { instance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';
import { time } from '../../helpers/helpers.js';

export const ChatContainer = ({ user }) => {
    const [value, setValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [sender, setSender] = useState('');
    const [receiptId, setReceiptId] = useState('');

    const chatBox = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const send = async (event) => {
        setSender('you');
        event.preventDefault();
        await instance
            .post(getApiLink('sendMessage'), {
                chatId: `${user}@c.us`,
                message: `${value}`,
            })
            .then(() => {
                setMessage(value);
            });
        setChatMessages([...chatMessages, value]);
        setValue('');
    };

    const getMessage = async () => {
        setSender('to me');
        await instance
            .get(getApiLink('ReceiveNotification'))
            .then((response) => {
                if (response.data != null) {
                    if (response.data.body.senderData.sender === `${user}@c.us`) {
                        setReceiptId(response.data.receiptId);
                        setMessage(response.data.body.messageData.textMessageData.textMessage);
                        setChatMessages([
                            ...chatMessages,
                            response.data.body.messageData.textMessageData.textMessage,
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

    useEffect(() => {}, [receiptId]);

    useEffect(() => {
        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }, [chatMessages]);

    return (
        <div className={styles.chatContainer} user={user}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {chatMessages.map((message, index) => (
                    <ChatMessage message={message} sender={sender} key={index} time={time} />
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
                    <button className={styles.chatInputSendBtn} type='submit' onClick={getMessage}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};
