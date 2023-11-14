import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { ChatContainer } from '../../components/ChatContainer/ChatContainer';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAithorization';
import { apiLocalStorage, idLocalStorage } from '../../helpers/localStorage';
import styles from './ChatPage.module.css';

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
    console.log(isLoggedIn);

    if (!isLoggedIn) return <Navigate to='/login' />;

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
