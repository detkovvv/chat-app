export interface IMessages {
    type: string;
    idMessage: string;
    timestamp: string | number;
    textMessage: string;
}
export interface IChatStore {
    chatStore: IMessages[];
}

const defaultState: IChatStore = {
    chatStore: [],
};

const GET_CHAT_HISTORY = 'GET_CHAT_HISTORY';
const ADD_MESSAGE = 'ADD_MESSAGE';
const CLEAR_CHAT = 'CLEAR_CHAT';

export const chatReducer = (state = defaultState, action: AnyAction): IChatStore => {
    switch (action.type) {
        case 'GET_CHAT_HISTORY':
            return {
                ...state,
                chatStore: [...action.payload].reverse(),
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                chatStore: [...state.chatStore, action.payload],
            };
        case 'CLEAR_CHAT':
            return defaultState;
        default:
            return state;
    }
};

export const getChatHistoryAction = (payload: IMessages[]) => ({ type: GET_CHAT_HISTORY, payload });
export const addMessageAction = (payload: IMessages) => ({ type: ADD_MESSAGE, payload });
export const clearChatAction = () => ({ type: CLEAR_CHAT });
import { type AnyAction } from 'redux';
