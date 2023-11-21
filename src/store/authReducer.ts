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
