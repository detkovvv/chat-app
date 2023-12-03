import { apiLocalStorage, idLocalStorage } from '../localStorage.js';

export const getApiLink = (route: string, additionRoute?: string): string => {
    return `/waInstance${idLocalStorage}/${route}/${apiLocalStorage}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};

export const getAuthLink = (idInstance: string, apiTokenInstance: string): string => {
    return `/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
};
