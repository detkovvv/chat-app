import { type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useInputValue } from './useInput';
import { getAuthLink } from '../helpers/api/getApiLink';
import { axiosInstance } from '../helpers/axios';
import { toLocalStorage } from '../helpers/localStorage';
import { loginAction, logoutAction } from '../store/authReducer.js';
import { receivedErrorAction, setIsLoadingAction } from '../store/contactsReducer.js';

export const useAuthorization = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((store) => store.auth.authInfo.wid);
    const dispatch = useDispatch();

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
        dispatch(logoutAction({}));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setIsLoadingAction(true));
        await axiosInstance
            .get(getAuthLink(idInstance, apiTokenInstance))
            .then((response) => {
                if (response.data.wid) {
                    toLocalStorage('idInstance', idInstance);
                    toLocalStorage('apiTokenInstance', apiTokenInstance);
                    toLocalStorage('wid', response.data.wid);
                    setIsLoggedIn(idInstance, apiTokenInstance, response.data.wid);
                    navigate('/');
                } else {
                    dispatch(receivedErrorAction('неверный логин или пароль'));
                }
            })
            .catch((error) => dispatch(receivedErrorAction(error.message)))
            .finally(() => dispatch(setIsLoadingAction(false)));
    };
    return {
        isLoggedIn: isLoggedIn as boolean,
        idInstance,
        apiTokenInstance,
        setIsLoggedIn,
        setIsLoggedOut,
        handleSubmit,
        setIdInstance,
        setApiTokenInstance,
    };
};
