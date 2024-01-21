import axios from './axios.js';

export const register_req = async (user) => {
    return await axios.post(`/register`, user);
};

export const login_req = (user) => axios.post(`/login`, user);

export const verify_token_req = () => axios.get('/verify');