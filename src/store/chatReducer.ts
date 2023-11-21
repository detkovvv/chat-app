export interface IchatStore {
    chatStore: string[];
}

const defaultState = {
    chatStore: [],
};

export const chatReducer = (state = defaultState, action: any) => {
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
