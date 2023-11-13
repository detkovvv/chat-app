//TODO: нужен менеджер состояний (Redux)
import { createStore } from 'redux';

const defaultState = {
    idInstance: '',
    apiTokenInstance: '',
    authorized: false,
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authorized: true,
                idInstance: action.payload.idInstance,
                apiTokenInstance: action.payload.apiTokenInstance,
            };
        case 'LOG_OUT':
            return {
                ...state,
                authorized: false,
                idInstance: '',
                apiTokenInstance: '',
            };
        default:
            return state;
    }
};

export const store = createStore(authReducer);
