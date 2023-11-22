import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { addContactAction, getContactsAction } from '../contactsReducer.js';

export const fetchContacts = () => {
    return (dispatch) => {
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => dispatch(getContactsAction(response.data)))
            .catch((error) => console.log(error));
    };
};

export const fetchContact = () => {
    return (dispatch) => {
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => dispatch(addContactAction(response.data)))
            .catch((error) => console.log(error));
    };
};
