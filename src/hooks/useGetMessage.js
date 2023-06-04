import { useCallback, useEffect } from 'react';
import { axiosInstance } from '../helpers/axios/index.js';
import { getApiLink } from '../helpers/getApiLink.js';
import { apiLocalStorage, idLocalStorage } from '../helpers/localStorage.js';

export const useGetMessage = (user, setMessages, messages) => {
    const getMessage = useCallback(async () => {
        await axiosInstance
            .get(getApiLink('ReceiveNotification', idLocalStorage, apiLocalStorage))
            .then(({ data }) => {
                if (data) {
                    if (data.body.senderData.sender === `${user}@c.us`) {
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
                    axiosInstance.delete(
                        getApiLink(
                            'deleteNotification',
                            idLocalStorage,
                            apiLocalStorage,
                            receiptId,
                        ),
                    );
                }
            });
    }, [setMessages, apiLocalStorage, idLocalStorage]);
    useEffect(() => {
        const timerId = setInterval(async () => {
            await getMessage();
        }, 1000);
        return () => clearInterval(timerId);
    }, [getMessage]);
};
