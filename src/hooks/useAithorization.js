import { axiosInstance } from '../helpers/axios';
import { toLocalStorage } from '../helpers/localStorage';
import { useNavigate } from 'react-router-dom';
import { useInputValue } from './useInput';
import { useState } from 'react';
import { getAuthLink } from '../helpers/api/getApiLink';
import { useDispatch, useSelector } from 'react-redux';

//TODO: не переходит с первого раза на страницу чата, если в localStorage пусто

export const useAuthorization = () => {
    // const navigate = useNavigate();
    const isLoggedIn = useSelector((store) => store.authorized);
    const dispatch = useDispatch();

    const [idInstance, setIdInstance] = useInputValue();
    const [apiTokenInstance, setApiTokenInstance] = useInputValue();

    const [invalid, setInvalid] = useState(false);
    const setIsLoggedIn = () => {
        dispatch({ type: 'LOG_IN' }, { payload: true });
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
                    setIsLoggedIn(true);
                    // navigate('/');
                } else {
                    setInvalid(true);
                }
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setInvalid(true);
                }
            });
        console.log(isLoggedIn);
    };
    return { isLoggedIn, setIsLoggedIn, invalid, handleSubmit, setIdInstance, setApiTokenInstance };
};
