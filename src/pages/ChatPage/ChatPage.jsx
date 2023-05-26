import React, { useEffect, useState } from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.jsx';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer.jsx';
import { instance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';

export const ChatPage = () => {
    const [user, setUser] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleChange = (user) => {
        setUser(user);
    };
    useEffect(() => {
        instance
            .post(getApiLink('getChatHistory'), {
                chatId: `${user}@c.us`,
                count: 10,
            })
            .then((response) => {
                console.log(response.data);
                setChatMessages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(chatMessages);
    }, [user]);

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar onChange={handleChange} />
                <ChatContainer user={user} chatMessages={chatMessages} />
            </div>
        </div>
    );
};
