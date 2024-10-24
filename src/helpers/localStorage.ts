export const getAuthKeyFromLocalStorage = () => localStorage.getItem('auth');

export const setAuthKeyToLocalStorage = (authKey: string) => localStorage.setItem('auth', authKey);

export const removeAuthKeyFromLocalStorage = () => localStorage.removeItem('auth');
