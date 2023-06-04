export const getApiLink = (route: string, idInstance: string, apiTokenInstance: string, additionRoute?: string): string => {
    return `/waInstance${idInstance}/${route}/${apiTokenInstance}${
        additionRoute ? `/${additionRoute}` : ''
    }`;
};
