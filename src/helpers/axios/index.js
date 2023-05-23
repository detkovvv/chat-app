import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://api.green-api.com',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});
