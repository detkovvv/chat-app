import { axiosInstance } from '../helpers/axios';
import { getApiLink } from '../helpers/getApiLink';
import { toLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useAuthorization = () => {
    // const navigate = useNavigate();

    const [invalid, setInvalid] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const form = useForm({
        initialValue: { idInstance: '', apiTokenInstance: '' },
    });

    const handleSubmit = async (event, value) => {
        event.preventDefault();
        const { idInstance, apiTokenInstance } = value;

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
    return [isLoggedIn, invalid, handleSubmit];
};
