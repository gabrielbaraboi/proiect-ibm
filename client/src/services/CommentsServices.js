import axios from "axios";

export const postComment = async (id, comment) => {
    try {
        const res = await axios
            .post(`http://localhost:9000/posts/${id}`, comment, { withCredentials: true });
        return res;
    } catch (err) {
        throw err;
    }
};

export const getNextCommentPage = async (postID, lastCommentDate) => {
    try {
        const res = await axios
            .get(`http://localhost:9000/posts/postComments/${postID}`, {
                params: { lastCommentDate }
            });
        return res;
    } catch (err) {
        throw err;
    }
};