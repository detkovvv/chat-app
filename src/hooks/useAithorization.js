import { axiosInstance } from '../helpers/axios';
import { getApiLink } from '../helpers/getApiLink';
import { toLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { useInputValue } from './useInput';
import { useState } from 'react';

export const useAuthorization = () => {
    // const navigate = useNavigate();

    const [idInstance, setIdInstance] = useInputValue();
    const [apiTokenInstance, setApiTokenInstance] = useInputValue();

    const [invalid, setInvalid] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (event, value) => {
        event.preventDefault();

        try {
            const { data } = await axiosInstance.get(
                getApiLink('getStateInstance', idInstance, apiTokenInstance),
            );
            if (data.stateInstance === 'authorized') {
                setInvalid(false);
                // navigate('/');
                toLocalStorage('idInstance', idInstance);
                toLocalStorage('apiTokenInstance', apiTokenInstance);
            } else {
                setInvalid(true);
            }
        } catch (e) {
            if (e instanceof Error) {
                setInvalid(true);
            }
        }
        setIsLoggedIn(true);
    };
    return { isLoggedIn, invalid, handleSubmit, setIdInstance, setApiTokenInstance };
};
