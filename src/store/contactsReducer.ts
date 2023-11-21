import { type IContact } from '../components/Sidebar/Sidebar.js';

export interface IcontactsList {
    contactList: IContact[];
}

const defaultState = {
    contactsList: [],
};

export const contactsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return {
                ...state,
                contactsList: [...action.payload],
            };
        default:
            return state;
    }
};
