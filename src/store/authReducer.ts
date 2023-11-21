// TODO: сделать типизацию для store

export interface IauthInfo {
    authInfo: {
        idInstanceStore: string;
        apiTokenInstanceStore: string;
        authorized: boolean;
    };
}

const defaultState = {
    authInfo: {
        idInstanceStore: '',
        apiTokenInstanceStore: '',
        authorized: false,
    },
};

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const authReducer = (state = defaultState, action) => {
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
export const loginAction = (payload) => ({ type: LOG_IN, payload });
export const logoutAction = (payload) => ({ type: LOG_OUT, payload });
