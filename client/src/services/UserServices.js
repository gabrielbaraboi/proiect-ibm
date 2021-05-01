import axios from "axios";

export const login = async (data) => {
    try {
        const res = await axios
            .post('http://localhost:9000/users/login', data, { withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
};

export const register = async (data) => {
    try {
        const res = await axios
            .post('http://localhost:9000/users/signup', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return res;
    } catch (err) {
        throw err;
    }
};

export const logout = async () => {
    try {
        const res = await axios
            .get('http://localhost:9000/users/logout', { withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
};

export const updateProfile = async (userData, id) => {
    try {
        const res = await axios
            .put(`http://localhost:9000/profile/updateProfile/${id}`, userData, {
                withCredentials: true
                , headers: { 'Content-Type': 'multipart/form-data' }
            });
        return res;
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await axios
            .delete(`http://localhost:9000/profile/${id}`, { withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getProfile = async (id) => {
    try {
        const res = axios.get(`http://localhost:9000/profile/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

