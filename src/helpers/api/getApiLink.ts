import { getAuthSession } from '../localStorage.js';

export const getApiLink = (route: string, additionRoute?: string): string => {
    const { idInstance, apiTokenInstance } = getAuthSession();
    return `/waInstance${idInstance}/${route}/${apiTokenInstance}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};

export const getAuthLink = (idInstance: string, apiTokenInstance: string): string => {
    return `/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
};
