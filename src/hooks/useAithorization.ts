import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInputValue } from './useInput';
import { getAuthLink } from '../helpers/api/getApiLink';
import { axiosInstance } from '../helpers/axios';
import { saveAuthSession } from '../helpers/localStorage';
import { loginAction, logoutAction } from '../store/authReducer.js';
import { clearChatAction } from '../store/chatReducer.js';
import { clearContactsAction, receivedErrorAction, setIsLoadingAction } from '../store/contactsReducer.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';

export const useAuthorization = () => {
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector((store) => store.auth.authInfo.wid);
    const dispatch = useAppDispatch();

    const [idInstance, setIdInstance] = useInputValue();
    const [apiTokenInstance, setApiTokenInstance] = useInputValue();

    const setIsLoggedIn = (idInstance: string, apiTokenInstance: string, wid: string) => {
        dispatch(
            loginAction({
                idInstanceStore: idInstance,
                apiTokenInstanceStore: apiTokenInstance,
                widStore: wid,
            }),
        );
    };
    const setIsLoggedOut = () => {
        dispatch(logoutAction());
        dispatch(clearContactsAction());
        dispatch(clearChatAction());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(receivedErrorAction(null));
        dispatch(setIsLoadingAction(true));
        await axiosInstance
            .get(getAuthLink(idInstance, apiTokenInstance))
            .then((response) => {
                if (response.data.wid) {
                    saveAuthSession(idInstance, apiTokenInstance, response.data.wid);
                    setIsLoggedIn(idInstance, apiTokenInstance, response.data.wid);
                    navigate('/live');
                } else {
                    dispatch(receivedErrorAction('неверный логин или пароль'));
                }
            })
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
    return {
        isLoggedIn: Boolean(isLoggedIn),
        idInstance,
        apiTokenInstance,
        setIsLoggedIn,
        setIsLoggedOut,
        handleSubmit,
        setIdInstance,
        setApiTokenInstance,
    };
};
