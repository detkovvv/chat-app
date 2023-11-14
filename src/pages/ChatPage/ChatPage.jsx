import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import styles from './ChatPage.module.css';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { apiLocalStorage, idLocalStorage } from '../../helpers/localStorage';
import { useAuthorization } from '../../hooks/useAithorization';

const useInitAuth = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuthorization();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (idLocalStorage && apiLocalStorage) {
            setIsLoggedIn(idLocalStorage, apiLocalStorage);
        }
        setIsChecked(true);
        console.log(isChecked);
        console.log(isLoggedIn);
    }, []);

    useEffect(() => {
        if (isChecked && !isLoggedIn) navigate('/login');
    }, [isChecked, isLoggedIn]);
};

const WithAuth = ({ children }) => {
    useInitAuth();
    return children;
};

export const ChatPage = () => {
    const { isLoggedIn } = useAuthorization();
    const { phoneNumber } = useParams();

    return (
        <WithAuth>
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
        </WithAuth>
    );
};
