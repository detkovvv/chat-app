import { getApiLink } from './api/getApiLink.js';
import { axiosInstance } from './axios/index.js';

export const getAvatar = async (userPhone: string) => {
    const avatar = axiosInstance
        .post(getApiLink('getAvatar'), {
            chatId: `${userPhone}`,
        })
        .then((response) => response.data.urlAvatar);
    return avatar;
};
