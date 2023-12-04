import { useCallback, useEffect } from 'react';

import { getMessage } from '../store/asyncActions/chat.js';
import { type IMessages } from '../store/chatReducer.js';
import { CustomDispatch } from '../store/index.js';

export const useGetMessage = (user: string, messages: IMessages[]) => {
    const getMessageCurrent = useCallback(() => {
        CustomDispatch(getMessage(user));
    }, [messages]);

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log('worked');
            getMessageCurrent();
        }, 5000_0000);
        return () => clearInterval(timerId);
    }, [messages]);
};
