export const fetchToken = () => {
    return localStorage.getItem('jwt');
}

export const removeToken = () => {
    localStorage.removeItem('jwt');
}

export const setToken = (val: string) => {
    localStorage.setItem('jwt', val);
}
