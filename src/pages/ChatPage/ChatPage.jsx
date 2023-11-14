import React from 'react';
import styles from './ChatPage.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAithorization';

export const ChatPage = () => {
    const { isLoggedIn } = useAuthorization();
    const { phoneNumber } = useParams();
    console.log(isLoggedIn);

    if (!isLoggedIn) return <Navigate to='/login' />;

    return (
        <div className={styles.chatPage}>
            <div className={styles.chatPageContainer}>
                <Sidebar />
                {phoneNumber ? (
                    <ChatContainer user={phoneNumber} />
                ) : (
                    //TODO: вынести в отдельный компонент?
                    <div className={styles.chatContainer}>
                        <div className={styles.chatContainerHeader} />
                        <div className={styles.chatDisplayContainer}>
                            <img alt='#' src='src/assets/whatsApp.png' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
