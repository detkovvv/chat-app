import { useCallback, useEffect } from 'react';

import { getMessage } from '../store/asyncActions/chat.js';
import { CustomDispatch } from '../store/index.js';

export interface IMessages {
    type: string;
    idMessage: string;
    timestamp: string;
    textMessage: string;
}

export const useGetMessage = (user: string, messages: IMessages[]) => {
    const getMessageCurrent = useCallback(() => {
        CustomDispatch(getMessage(user));
    }, [messages]);

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log('worked');
            getMessageCurrent();
        }, 1000_000);
        return () => clearInterval(timerId);
    }, [user]);
};
