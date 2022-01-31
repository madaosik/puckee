import { AccessToken } from "puckee-common/types"

export const fetchToken = () : AccessToken => {
    const token = localStorage.getItem('access_token')
    if (!token) {
        console.error('Unable to retrieve access token!')
    }
    return token
}

export const removeToken = () => {
    localStorage.removeItem('jwt');
}

export const setToken = (val: string) => {
    localStorage.setItem('jwt', val);
}
