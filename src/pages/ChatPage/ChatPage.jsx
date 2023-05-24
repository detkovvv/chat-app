import React, { useState } from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.jsx';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer.jsx';

export const ChatPage = () => {
    const [user, setUser] = useState('');

    const handleChange = (user) => {
        setUser(user);
    };

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar onChange={handleChange} />
                <ChatContainer user={user} />
            </div>
        </div>
    );
};
