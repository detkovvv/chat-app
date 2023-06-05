import React, { useState } from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer';
import { Navigate } from 'react-router-dom';

export const ChatPage = ({ isLoggedIn }) => {
    const [user, setUser] = useState('');

    const handleChange = (user) => {
        setUser(user);
    };

    return isLoggedIn ? (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar onChange={handleChange} />
                <ChatContainer user={user} />
            </div>
        </div>
    ) : (
        <Navigate to='login' />
    );
};
