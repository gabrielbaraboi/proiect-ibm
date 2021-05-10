import axios from "axios";
import { logout } from "./UserServices";
import { clearUser } from "./localStorageManagment";

export const postComment = async (id, comment) => {
    try {
        const res = await axios
            .post(`http://localhost:9000/posts/${id}`, comment, { withCredentials: true });
        return res;
    } catch (err) {
        console.log(`Token-ul a expirat!`);
        logout().then(res => console.log(res)).catch(err => console.log(err.message));
        clearUser();
    }
};

export const getNextCommentPage = async (postID, lastCommentID) => {
    try {
        const res = await axios
            .get(`http://localhost:9000/posts/postComments/${postID}`, {
                params: { lastCommentID }
            });
        return res;
    } catch (err) {
        throw err;
    }
};

export const deleteComment = async (commentID) => {
    try {
        const res = await axios.delete(`http://localhost:9000/posts/comment/${commentID}`,{ withCredentials: true });
        return res;
    } catch (error) {
        throw error;
    }
};

export const updateComment = async (commentID,updatedComment) =>{
    try {
        const res = await axios.put(`http://localhost:9000/posts/comment/${commentID}`, {comment : updatedComment},{ withCredentials: true });
        return res;
    } catch (error) {
        throw error;
    }
};