import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import {
    addContactAction,
    getContactsAction,
    receivedErrorAction,
    setIsLoadingAction,
    type IContact,
} from '../contactsReducer.js';
import { type DispatchType } from '../index.js';

export const fetchContacts = () => {
    return (dispatch: DispatchType) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => dispatch(getContactsAction(response.data)))
            .then(() => dispatch(setIsLoadingAction(false)))
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};

export const fetchAddNewContact = (value: string, callback: (value: string) => IContact) => {
    return (dispatch: DispatchType) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('GetContactInfo'), {
                chatId: `${value}@c.us`,
            })
            .then((response) => {
                if (response.data.chatId) {
                    dispatch(receivedErrorAction(null));
                    dispatch(addContactAction(callback(value)));
                } else dispatch(receivedErrorAction('пользователь не зарегистрирован'));
            })
            .catch((error) => {
                dispatch(receivedErrorAction(error.message));
            })
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};
