import { type Dispatch } from 'redux';

import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import {
    addContactAction,
    getContactsAction,
    receivedErrorAction,
    setIsLoadingAction,
} from '../contactsReducer.js';

export const fetchContacts = () => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => dispatch(getContactsAction(response.data)))
            .then(() => dispatch(setIsLoadingAction(false)))
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const fetchAddNewContact = (value: string, callback: CallableFunction) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('GetContactInfo'), {
                chatId: `${value}@c.us`,
            })
            .then((response) => {
                if (response.data.chatId) {
                    dispatch(receivedErrorAction(false));
                    dispatch(addContactAction(callback(value, parseInt(response.data.chatId))));
                } else dispatch(receivedErrorAction('пользователь не зарегистрирован'));
            })
            .catch((error) => {
                dispatch(receivedErrorAction(error.message));
            })
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};
