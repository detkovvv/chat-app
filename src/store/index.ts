import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from './authReducer.js';
import { chatReducer } from './chatReducer.js';
import { contactsReducer } from './contactsReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    contacts: contactsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type DispatchType = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const CustomDispatch = store.dispatch;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
