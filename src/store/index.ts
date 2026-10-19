import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore, type AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { type ThunkDispatch } from 'redux-thunk';

import { authReducer } from './authReducer.js';
import { chatReducer } from './chatReducer.js';
import { contactsReducer } from './contactsReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    contacts: contactsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;
export const CustomDispatch = store.dispatch as DispatchType;

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
