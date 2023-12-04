export interface IAuthInfo {
    authInfo: {
        idInstanceStore: string;
        apiTokenInstanceStore: string;
        wid: string;
    };
}

const defaultState: IAuthInfo = {
    authInfo: {
        idInstanceStore: '',
        apiTokenInstanceStore: '',
        wid: '',
    },
};

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const authReducer = (state = defaultState, action): IAuthInfo => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authInfo: {
                    idInstanceStore: action.payload.idInstanceStore,
                    apiTokenInstanceStore: action.payload.apiTokenInstanceStore,
                    wid: action.payload.widStore,
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
