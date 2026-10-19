import { useEffect } from 'react';

import { getMessage } from '../store/asyncActions/chat.js';
import { CustomDispatch } from '../store/index.js';

export const useGetMessage = (user: string) => {
    useEffect(() => {
        const timerId = setInterval(() => {
            CustomDispatch(getMessage(user));
        }, 5_000);
        return () => clearInterval(timerId);
    }, [user]);
};
