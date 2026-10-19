export interface IContact {
    id: string;
    name: string;
    type: string;
}
export interface IContactsState {
    contactsList: IContact[];
    isLoading: boolean;
    error: string | null;
}

const defaultState: IContactsState = {
    contactsList: [] as IContact[],
    isLoading: false,
    error: null,
};

export type ContactsList = typeof defaultState;

const GET_CONTACTS = 'GET_CONTACTS';
const ADD_CONTACT = 'ADD_CONTACT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const RECEIVED_AN_ERROR = 'RECEIVED_AN_ERROR';
const CLEAR_CONTACTS = 'CLEAR_CONTACTS';

export const contactsReducer = (state = defaultState, action: AnyAction): IContactsState => {
    switch (action.type) {
        case 'GET_CONTACTS':
            return {
                ...state,
                contactsList: [...action.payload],
            };
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contactsList: [...state.contactsList, action.payload],
            };
        case 'RECEIVED_AN_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_CONTACTS':
            return defaultState;
        default:
            return state;
    }
};

export const getContactsAction = (payload: IContact[]) => ({ type: GET_CONTACTS, payload });
export const addContactAction = (payload: IContact) => ({ type: ADD_CONTACT, payload });
export const setIsLoadingAction = (payload: boolean) => ({ type: SET_IS_LOADING, payload });
export const receivedErrorAction = (payload: string | null) => ({ type: RECEIVED_AN_ERROR, payload });
export const clearContactsAction = () => ({ type: CLEAR_CONTACTS });
import { type AnyAction } from 'redux';
