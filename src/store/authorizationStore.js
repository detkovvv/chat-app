import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const defaultState = {
    authInfo: {
        idInstanceStore: '',
        apiTokenInstanceStore: '',
        authorized: false,
    },
    contactList: [],
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

export const setAuthorization = (value) => {
    authReducer(value);
};

export const authStore = createStore(authReducer, composeWithDevTools(applyMiddleware(thunk)));
