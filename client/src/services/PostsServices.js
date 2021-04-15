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
export const getPostDetails = async (id) => {
    try {
        const res = await axios.get(`http://localhost:9000/posts/postDetails/${id}`);
        return res;
    }catch(err){
        throw err;
    }
};
