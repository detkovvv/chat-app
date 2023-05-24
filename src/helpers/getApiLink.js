import { apiTokenInstance, idInstance } from './helpers.js';

export const getApiLink = (route, additionRoute) => {
    return `/waInstance${idInstance}/${route}/${apiTokenInstance}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};
