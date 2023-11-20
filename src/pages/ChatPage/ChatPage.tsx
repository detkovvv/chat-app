import { type FC, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    }, []);

    useEffect(() => {
        if (isChecked && !isLoggedIn) navigate('/login');
    }, [isChecked, isLoggedIn]);
};

const WithAuth: FC<{ children: JSX.Element }> = ({ children }) => {
    useInitAuth();
    return children;
};

export const ChatPage: FC = () => {
    const { phoneNumber } = useParams();

    return (
        <WithAuth>
            <div className={styles.chatPage}>
                <div className={styles.chatPageContainer}>
                    <Sidebar />
                    {phoneNumber ? (
                        <ChatContainer user={phoneNumber} />
                    ) : (
                        <div className={styles.chatContainer}>
                            <div className={styles.chatContainerHeader} />
                            <div className={styles.chatDisplayContainer}>
                                <div className={styles.info}>
                                    <p>Выберите, кому хотели бы написать</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </WithAuth>
    );
};
