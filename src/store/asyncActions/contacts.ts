import { type Dispatch } from 'redux';

import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { addContactAction, getContactsAction } from '../contactsReducer.js';

export const fetchContacts = (dispatch: Dispatch) => {
    return () => {
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => dispatch(getContactsAction(response.data)))
            .catch((error) => console.log(error));
    };
};
// TODO: доделать fetchAddContact
export const fetchAddContact = (value, setInvalid, handler) => {
    return (dispatch) => {
        axiosInstance
            .post(getApiLink('checkWhatsapp'), {
                phoneNumber: `${value}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp) {
                    setInvalid(false);
                    setNewContact(value);
                    handleChange('');
                    setContacts([...contacts, createNewContact(newContact)]);
                    navigate('/chat/' + newContact + '@c.us');
                } else {
                    setInvalid(true);
                    handleChange('');
                }
            })
            .catch((error) => {
                console.log(value);
                setInvalid(true);
                console.log(error.message);
                handleChange('');
            });
    };
};
