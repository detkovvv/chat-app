import { axiosInstance } from '../helpers/axios';
import { toLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { useInputValue } from './useInput';
import { useState } from 'react';
import { getAuthLink } from '../helpers/api/getApiLink';
import { useDispatch, useSelector } from 'react-redux';

export const useAuthorization = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((store) => store.authInfo.authorized);
    const dispatch = useDispatch();

    const [idInstance, setIdInstance] = useInputValue();
    const [apiTokenInstance, setApiTokenInstance] = useInputValue();
    const [invalid, setInvalid] = useState(false);

    const setIsLoggedIn = (idInstance, apiTokenInstance) => {
        dispatch({
            type: 'LOG_IN',
            payload: { idInstanceStore: idInstance, apiTokenInstanceStore: apiTokenInstance },
        });
    };
    const setIsLoggedOut = () => {
        dispatch({
            type: 'LOG_OUT',
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await axiosInstance
            .get(getAuthLink(idInstance, apiTokenInstance))
            .then((response) => {
                if (response.data.stateInstance === 'authorized') {
                    setInvalid(false);
                    toLocalStorage('idInstance', idInstance);
                    toLocalStorage('apiTokenInstance', apiTokenInstance);
                    setIsLoggedIn(idInstance, apiTokenInstance);
                    navigate('/');
                } else {
                    setInvalid(true);
                }
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setInvalid(true);
                }
            });
    };
    return {
        isLoggedIn,
        setIsLoggedIn,
        setIsLoggedOut,
        invalid,
        handleSubmit,
        setIdInstance,
        setApiTokenInstance,
    };
};
