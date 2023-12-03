import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import deleteNotification from '../../mocks/delete-notification-200.json';
import getNotification from '../../mocks/get-notification-200.json';
import getSettings from '../../mocks/get-settings-200.json';
import postCheckWhatsapp from '../../mocks/post-check-whatsapp-200.json';
import postContacts from '../../mocks/post-contacts-200.json';
import postMessagesHistory from '../../mocks/post-messages-history-200.json';
import { getApiLink } from '../api/getApiLink';

// const useMock = import.meta.env.VITE_USE_MOCKS || true;
//
// export const mock = new MockAdapter(axios, { delayResponse: 3000 });
//
// mock.onGet(new RegExp('getSettings')).reply(200, getSettings);
// mock.onDelete(new RegExp('deleteNotification')).reply(200, deleteNotification);
// mock.onGet(getApiLink('ReceiveNotification')).reply(200, getNotification);
// mock.onPost(getApiLink('checkWhatsapp')).reply(200, postCheckWhatsapp);
// mock.onPost(getApiLink('getContacts')).reply(200, postContacts);
// mock.onPost(getApiLink('getChatHistory')).reply(200, postMessagesHistory);

export const axiosInstance = axios.create({
    baseURL: 'https://api.green-api.com',
    timeout: 500,
    headers: { 'Content-Type': 'application/json' },
});
