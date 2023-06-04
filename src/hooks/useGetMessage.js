import { useCallback, useEffect } from 'react';
import { instance } from '../helpers/axios/index';
import { getApiLink } from '../helpers/getApiLink';
import { apiTokenInstance, idInstance } from '../helpers/helpers';

export const useGetMessage = (user, setMessages, messages) => {
    const getMessage = useCallback(() => {
        instance
            .get(getApiLink('ReceiveNotification', idInstance, apiTokenInstance))
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
                    instance.delete(
                        getApiLink('deleteNotification', idInstance, apiTokenInstance, receiptId),
                    );
                }
            });
    }, [setMessages, apiTokenInstance, idInstance]);

    useEffect(() => {
        const timerId = setInterval(() => {
            getMessage();
        }, 1000);
        return () => clearInterval(timerId);
    }, [getMessage]);
};
