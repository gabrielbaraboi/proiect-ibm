import Post from '../models/PostModel.js';

const userAccess = (post, user) => {
    return (post.createdBy === user.id || user.role === 'admin');
};

export const userPost = async (req, res, next) => {
    const postID = req.params.id;
    await Post.findById(postID)
        .then((post) => {
            if (!userAccess(post, req.user))
                return res.status(403).json({ message: "Post doesn't belong to user!" });
            req.post = post;
            next();
        })
        .catch(error => { return res.status(404).json({ message: error.message }); });
};