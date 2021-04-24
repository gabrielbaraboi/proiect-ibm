import Comment from '../models/CommentModel.js';

const userAccess = (comment, user) => {
    return (comment.createdBy === user.id || user.role === 'admin');
};

export const userComment = async (req, res, next) => {
    const commentID = req.params.id;
    await Comment.findById(commentID)
        .then(comment => {
            if (!userAccess(comment, req.user))
                return res.status(403).json({ message: "Comment doesn't belong to user!" });
            req.comment=comment;
            next();
        })
        .catch(error => {
            return res.status(404).json({ message: error.message });
        });
}