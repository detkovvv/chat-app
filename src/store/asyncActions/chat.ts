import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { addMessageAction, clearChatAction, getChatHistoryAction } from '../chatReducer.js';
import { receivedErrorAction, setIsLoadingAction } from '../contactsReducer.js';
import { type DispatchType } from '../index.js';

export const fetchChatHistory = (person: string) => {
    return (dispatch: DispatchType) => {
        dispatch(setIsLoadingAction(true));
        dispatch(clearChatAction());
        axiosInstance
            .post(getApiLink('getChatHistory'), {
                chatId: `${person}`,
                count: 20,
            })
            .then((response) => dispatch(getChatHistoryAction(response.data)))
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const sendMessage = (person: string, value: string) => {
    return (dispatch: DispatchType) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('sendMessage'), {
                chatId: `${person}`,
                message: `${value}`,
            })
            .then((response) =>
                dispatch(
                    addMessageAction({
                        type: 'outgoing',
                        idMessage: response.data.idMessage,
                        timestamp: Date.now(),
                        textMessage: `${value}`,
                    }),
                ),
            )
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const getMessage = (user: string) => {
    return (dispatch: DispatchType) => {
        axiosInstance
            .get(getApiLink('receiveNotification'))
            .then(({ data }) => {
                if (data?.body) {
                    if (data.body.senderData?.sender === user && data.body.messageData?.textMessageData?.textMessage) {
                        dispatch(
                            addMessageAction({
                                type: 'incoming',
                                idMessage: data.body.idMessage,
                                timestamp: String(data.body.timestamp),
                                textMessage: data.body.messageData.textMessageData.textMessage,
                            }),
                        );
                    }
                    return data.receiptId;
                }
            })
            .then((receiptId) => {
                if (receiptId) {
                    axiosInstance.delete(getApiLink('deleteNotification', receiptId));
                }
            })
            .catch((error) => dispatch(receivedErrorAction(error.message)));
    };
};
