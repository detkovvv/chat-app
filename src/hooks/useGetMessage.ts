import { useCallback, useEffect } from 'react';

import { getApiLink } from '../helpers/api/getApiLink';
import { axiosInstance } from '../helpers/axios/index';
import { apiLocalStorage, idLocalStorage } from '../helpers/localStorage';

interface IMessages {
    type: string;
    idMessage: string;
    timestamp: string;
    textMessage: string;
}

export const useGetMessage = (user: string, setMessages: any, messages: IMessages[]) => {
    const getMessage = useCallback(() => {
        axiosInstance
            .get(getApiLink('ReceiveNotification'))
            .then(({ data }) => {
                if (data) {
                    if (data.body.senderData.sender === `${user}`) {
                        setMessages([
                            ...messages,
                            {
                                type: 'incoming',
                                idMessage: data.body.idMessage,
                                timestamp: data.body.timestamp,
                                textMessage: data.body.messageData.textMessageData.textMessage,
                            },
                        ]);
                    }
                    return data.receiptId;
                }
            })
            .then((receiptId) => {
                if (receiptId) {
                    axiosInstance.delete(getApiLink('deleteNotification', receiptId));
                }
            });
    }, [setMessages, apiLocalStorage, idLocalStorage]);

    useEffect(() => {
        const timerId = setInterval(() => {
            getMessage();
        }, 100_000);
        return () => clearInterval(timerId);
    }, [getMessage]);
};
