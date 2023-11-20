import {
    useEffect,
    useRef,
    useState,
    type FC,
    useLayoutEffect,
    type KeyboardEventHandler,
} from 'react';

import styles from './ChatContainer.module.css';
import { getApiLink } from '../../helpers/api/getApiLink';
import { axiosInstance } from '../../helpers/axios';
import { type IMessages, useGetMessage } from '../../hooks/useGetMessage';
import { useInputValue } from '../../hooks/useInput';
import { ChatMessage } from '../ChatMessage/ChatMessage';

// TODO: переписать запросы через работу со store

export const ChatContainer: FC<{ user: string }> = ({ user }) => {
    const [value, setValue] = useInputValue();
    const [messages, setMessages] = useState<IMessages[]>([]);

    const chatBox = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        axiosInstance
            .post(getApiLink('getChatHistory'), {
                chatId: `${user}`,
                count: 10,
            })
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => console.log(error));
    }, [user]);

    useGetMessage(user, setMessages, messages);

    const sendMessage = async () => {
        const response = await axiosInstance.post(getApiLink('sendMessage'), {
            chatId: `${user}`,
            message: `${value}`,
        });
        setMessages([
            ...messages,
            {
                type: 'outgoing',
                idMessage: response.data.idMessage,
                timestamp: Date.now().toString(),
                textMessage: `${value}`,
            },
        ]);
        setValue('');
    };

    const handlePressKey: KeyboardEventHandler<HTMLInputElement> = async (event) => {
        if (event.code === 'Enter') {
            await sendMessage();
        }
    };

    useLayoutEffect(() => {
        if (chatBox.current) {
            const element = chatBox.current as HTMLDivElement;
            element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatContainerHeader}>
                <div className={styles.chatUserInfo}>
                    <p>Получатель: {user}</p>
                </div>
            </div>
            <div className={styles.chatDisplayContainer} ref={chatBox}>
                {messages.map((message) => (
                    <ChatMessage
                        key={message.idMessage}
                        message={message.textMessage}
                        sender={message.type}
                        time={message.timestamp}
                    />
                ))}
            </div>
            <div className={styles.chatInput}>
                <input
                    onChange={setValue}
                    onKeyDown={handlePressKey}
                    placeholder='Введите сообщение'
                    type='text'
                    value={value}
                />
                <button className={styles.chatInputSendBtn} onClick={sendMessage}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
