export interface IauthInfo {
    authInfo: {
        idInstanceStore: string;
        apiTokenInstanceStore: string;
        wid: string;
        avatar: string;
    };
}

const defaultState: IauthInfo = {
    authInfo: {
        idInstanceStore: '',
        apiTokenInstanceStore: '',
        wid: '',
        avatar: '',
    },
};

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const GET_MAIN_AVATAR = 'GET_MAIN_AVATAR';

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                authInfo: {
                    idInstanceStore: action.payload.idInstanceStore,
                    apiTokenInstanceStore: action.payload.apiTokenInstanceStore,
                    wid: action.payload.widStore,
                    avatar: '',
                },
            };
        case 'LOG_OUT':
            return {
                ...defaultState,
            };
        case 'GET_MAIN_AVATAR':
            return {
                ...state,
                authInfo: {
                    avatar: action.payload,
                },
            };
        default:
            return state;
    }
};
export const loginAction = (payload) => ({ type: LOG_IN, payload });
export const logoutAction = (payload) => ({ type: LOG_OUT, payload });
export const getMainAvatar = (payload) => ({ type: GET_MAIN_AVATAR, payload });
