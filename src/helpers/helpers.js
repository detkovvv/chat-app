export const toLocalStorage = (key, value) => localStorage.setItem(key, value);

export const idInstance = localStorage?.getItem('idInstance');
export const apiTokenInstance = localStorage?.getItem('apiTokenInstance');

export const time = new Date();
export const currentTime = time.getHours().toString() + ':' + time.getMinutes().toString();
