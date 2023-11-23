import { type IContact } from '../components/Sidebar/Sidebar.js';

const defaultState = {
    contactsList: [] as IContact[],
};

export type IcontactsList = typeof defaultState;

const GET_CONTACTS = 'GET_CONTACTS';
const ADD_CONTACT = 'ADD_CONTACT';

export const contactsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return {
                ...state,
                contactsList: [...state.contactsList, ...action.payload],
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contactsList: [...state.contactsList, action.payload],
            };
        default:
            return state;
    }
};

export const getContactsAction = (payload) => ({ type: GET_CONTACTS, payload });
export const addContactAction = (payload) => ({ type: ADD_CONTACT, payload });
