export const getApiLink = (route, idInstance, apiTokenInstance, additionRoute) => {
    return `/waInstance${idInstance}/${route}/${apiTokenInstance}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};
