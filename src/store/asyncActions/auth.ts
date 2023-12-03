import { getApiLink } from '../../helpers/api/getApiLink.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { getChatHistoryAction } from '../chatReducer.js';

export const fetchMainAvatar = (userInfo) => {
    return (dispatch) => {
        axiosInstance
            .post(getApiLink('getAvatar'), {
                chatId: `${userInfo}`,
            })
            .then((response) => dispatch(getChatHistoryAction(response.data)))
            .catch((error) => console.log(error));
    };
};
