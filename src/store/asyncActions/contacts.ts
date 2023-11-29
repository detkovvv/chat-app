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

export const fetchAddNewContact = (value, callback) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoadingAction(true));
        axiosInstance
            .post(getApiLink('checkWhatsapp'), {
                phoneNumber: `${value}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp) {
                    dispatch(addContactAction(callback(value)));
                } else dispatch(receivedErrorAction('пользователь не зарегистрирован'));
            })
            .catch((error) => {
                dispatch(receivedErrorAction(error.message));
                console.log(error.message);
            })
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
};
