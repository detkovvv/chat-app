import { apiTokenInstance, idInstance } from './helpers.js';

const getApiLink = (route, additionRoute) => {
    return `/waInstance${idInstance}/${route}/${apiTokenInstance}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};
