export const toLocalStorage = (key, value) => localStorage.setItem(key, value);

export const user = localStorage.getItem('phone');
export const idInstance = localStorage.getItem('idInstance');
export const apiTokenInstance = localStorage.getItem('apiTokenInstance');
