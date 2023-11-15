export const toLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const idLocalStorage: string | null = localStorage.getItem('idInstance');
export const apiLocalStorage: string | null = localStorage.getItem('apiTokenInstance');
