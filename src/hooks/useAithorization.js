import { axiosInstance } from '../helpers/axios';
import { toLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { useInputValue } from './useInput';
import { useState } from 'react';
import { getAuthLink } from '../helpers/api/getApiLink';

export const useAuthorization = () => {
    const navigate = useNavigate();

    const [idInstance, setIdInstance] = useInputValue();
    const [apiTokenInstance, setApiTokenInstance] = useInputValue();

    const [invalid, setInvalid] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axiosInstance.get(getAuthLink(idInstance, apiTokenInstance));
            if (data.stateInstance === 'authorized') {
                setInvalid(false);
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
        navigate('/');
        console.log(isLoggedIn);
    };
    return { isLoggedIn, invalid, handleSubmit, setIdInstance, setApiTokenInstance };
};
