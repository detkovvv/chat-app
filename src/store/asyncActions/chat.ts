import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { addMessageAction, getChatHistoryAction } from '../chatReducer.js';
import { receivedErrorAction, setIsLoadingAction } from '../contactsReducer.js';

export const fetchChatHistory = (person) => {
    return (dispatch) => {
        dispatch(setIsLoadingAction(true));
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

export const sendMessage = (person, value) => {
    return (dispatch) => {
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

export const getMessage = (user) => {
    return (dispatch) => {
        axiosInstance
            .get(getApiLink('receiveNotification'))
            .then(({ data }) => {
                if (data) {
                    if (data.body.senderData.sender === `${user}`) {
                        dispatch(
                            addMessageAction({
                                type: 'incoming',
                                idMessage: data.body.idMessage,
                                timestamp: data.body.timestamp,
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
            .catch((error) => console.log(error.message));
    };
};
