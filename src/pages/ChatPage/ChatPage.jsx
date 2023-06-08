import React from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer';
import { Navigate, useParams } from 'react-router-dom';

export const ChatPage = ({ isLoggedIn }) => {
    const { phoneNumber } = useParams();

    if (!isLoggedIn) return <Navigate to='/login' />;

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar />
                {phoneNumber ? (
                    <ChatContainer user={phoneNumber} />
                ) : (
                    <div className={styles.chatContainer}>
                        <div className={styles.chatContainerHeader}></div>
                        <div className={styles.chatDisplayContainer}>
                            <img src='src/assets/whatsApp.png' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
