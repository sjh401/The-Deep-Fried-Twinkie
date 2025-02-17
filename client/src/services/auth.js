import api from './api-config';

export const getUsers = async () => {
    try {
        let res = await api.get('/users');
        return res.data
    } catch (e) {
        return ({ errors: e })
    }
}
export const loginUser = async (loginData) => {
    const res = await api.post('/auth/login', { authentication: loginData });
    localStorage.setItem('authToken', res.data.token);
    api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
    return res.data.user
}

export const registerUser = async (registerData) => {
    const res = await api.post('/users', { user: registerData })
    localStorage.setItem('authToken', res.data.token);
    api.defaults.headers.common.authorization = `Bearer ${res.data.token}`
    return res.data.user
}

export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`
        const res = await api.get('/auth/verify');
        return res.data
    }
    return null
}

export const removeToken = () => {
    api.defaults.headers.common.authorization = null
}