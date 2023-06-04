import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://api.green-api.com',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});
