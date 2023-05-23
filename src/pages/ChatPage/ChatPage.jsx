import React from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar.jsx';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer.jsx';

export const ChatPage = () => {
    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar />
                <ChatContainer />
            </div>
        </div>
    );
};
