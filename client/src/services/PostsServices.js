import axios from "axios";

export const getNextPostsPage = async (sorting, date, programmingLanguage, workHours, workPlace, type, createdBy) => {
    try {
        const res = await axios.get('http://localhost:9000/posts/', {
            params: { sorting, date, programmingLanguage, workHours, workPlace, type, createdBy }
        });
        return res;
    } catch (err) {
        throw err;
    }
};

export const createPost = async (data) => {
    try {
        const res = await axios
            .post(`http://localhost:9000/posts/createPost/`, data, { withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getPostDetails = async (id) => {
    try {
        const res = await axios.get(`http://localhost:9000/posts/postDetails/${id}`);
        return res;
    } catch (err) {
        throw err;
    }
};

export const getWorkPlaces = async () => {
    try {
        const res = await axios.get(`http://localhost:9000/posts/workPlaces`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postID) => {
    try {
        const res = await axios.delete(`http://localhost:9000/posts/${postID}`, { withCredentials: true });
        return res;
    } catch (error) {
        throw error;
    }
};