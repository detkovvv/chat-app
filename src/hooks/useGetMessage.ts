import { useCallback, useEffect } from 'react';

import { getMessage } from '../store/asyncActions/chat.js';

export interface IMessages {
    type: string;
    idMessage: string;
    timestamp: string;
    textMessage: string;
}

export const useGetMessage = (user: string, messages: IMessages[]) => {
    const getMessageCurrent = useCallback(() => {
        getMessage(user);
    }, [messages]);

    useEffect(() => {
        const timerId = setInterval(() => {
            getMessageCurrent();
        }, 100_000);
        return () => clearInterval(timerId);
    }, [getMessageCurrent]);
};
