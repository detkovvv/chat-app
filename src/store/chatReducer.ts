export interface IchatStore {
    chatStore: string[];
}

const defaultState = {
    chatStore: [],
};

const GET_CHAT_HISTORY = 'GET_CHAT_HISTORY';
const ADD_MESSAGE = 'ADD_MESSAGE';

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

export const getChatHistoryAction = (payload) => ({ type: GET_CHAT_HISTORY, payload });
export const addMessageAction = (payload) => ({ type: ADD_MESSAGE, payload });
