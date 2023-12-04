import { getApiLink } from './api/getApiLink.js';
import { axiosInstance } from './axios/index.js';

export const fetchAvatarLink = async (userPhone: string) => {
    await axiosInstance
        .post(getApiLink('getAvatar'), {
            chatId: `${userPhone}`,
        })
        .then((response) => {
            console.log(response.data.urlAvatar);
        })
        .catch((error) => console.log(error.message));
};
