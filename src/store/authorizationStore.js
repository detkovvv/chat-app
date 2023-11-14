//TODO: нужен менеджер состояний (Redux)
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
    idInstanceStore: '',
    apiTokenInstanceStore: '',
    authorized: false,
};

const authReducer = (state = defaultState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authorized: true,
                idInstanceStore: action.payload.idInstanceStore,
                apiTokenInstanceStore: action.payload.apiTokenInstanceStore,
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
