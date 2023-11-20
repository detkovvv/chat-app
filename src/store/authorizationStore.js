import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const defaultState = {
    authInfo: {
        idInstanceStore: '',
        apiTokenInstanceStore: '',
        authorized: false,
    },
    contactsList: [],
    chatStore: [],
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authInfo: {
                    authorized: true,
                    idInstanceStore: action.payload.idInstanceStore,
                    apiTokenInstanceStore: action.payload.apiTokenInstanceStore,
                },
            };
        case 'LOG_OUT':
            return {
                ...defaultState,
            };
        default:
            return state;
    }
};

const contactsReducer = (state = defaultState, action) => {
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
const chatReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_CHAT_HISTORY':
            return {
                ...state,
                chatStore: [...action.payload],
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                chatStore: [...action.payload],
            };
        default:
            return state;
    }
};
export const setAuthorization = (value) => {
    authReducer(value);
};

export const authStore = createStore(authReducer, composeWithDevTools(applyMiddleware(thunk)));
