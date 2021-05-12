import mongoose from "mongoose";
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
import Application from '../models/ApplicationModel.js';
import { application } from "express";
const postsPageSize = 8;
const commentsPageSize = 10;

export const getPosts = async (req, res) => {

    const { sorting, postID, programmingLanguage, workHours, workPlace, type, createdBy } = req.query;

    try {

        const sorting_r = sorting === 'asc' ? 1 : -1;
        let postID_r = null;
        try {
            postID_r = mongoose.Types.ObjectId(postID);
        }
        catch (err) {

        }
        const filter = postID_r ? sorting_r === 1 ? { _id: { $gt: postID_r } } : { _id: { $lt: postID_r } } : {};

        if (programmingLanguage) filter['programmingLanguage'] = { $in: programmingLanguage };
        if (workHours) filter['workHours'] = { $in: workHours };
        if (workPlace) filter['workPlace'] = { $in: workPlace };
        if (type) filter['type'] = { $in: type };
        if (createdBy) filter['createdBy'] = { $in: createdBy };

        const posts = await Post.collection.aggregate([

            { $match: filter },
            { "$addFields": { "createdBy_id": { "$toObjectId": "$createdBy" } } },
            { $sort: { _id: sorting_r } },
            { $limit: postsPageSize },
            {
                $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
            { $project: { "createdBy_id": 0, "creator.password": 0, "creator.email": 0, "creator._id": 0 } }
        ]).toArray();
        //Last loaded post date console.log(posts[pageSize-1].dateCreated); 
        const hasPosts = posts.length > 0;
        return res.status(200).json({ posts, lastPostID: hasPosts ? posts[posts.length - 1]._id : 'same' });

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const postDetails = async (req, res) => {
    try {
        const post = await Post.collection.aggregate([

            { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
            { "$addFields": { "createdBy_id": { "$toObjectId": "$createdBy" } } },
            {
                $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            { $unwind: { path: "$creator", preserveNullAndEmptyArrays: true } },
            { $project: { "creator.password": 0, "creator.email": 0, "creator._id": 0 } }
        ]).next();
        if (!post)
            return res.status(404).json({ message: 'Post not found!' });
        const commentCount = await Comment.countDocuments({ postID: req.params.id });
        res.header("Content-Type", 'application/json');
        return res.status(200).json({ post, commentCount })

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


export const getApplications = (req, res) => {
     Application.find({ offerID: req.params.id })
        .populate('applicant', 'firstName lastName email linkedin github facebook twitter profilePicture')
        .exec((err, applications) => {
            if (err) {
                return res.status(404).json({ message: error.message });
            }
            res.header("Content-Type", 'application/json');
            return res.status(200).json({ applications })
        });
}


export const createApplication = (req, res) => {

    application['offerID'] = req.params.id
    application['applicant'] = mongoose.Types.ObjectId(req.body.applicant);

    Application.findOne({ applicant: application['applicant'], offerID: application['offerID'] })
        .then(checkApp => {
            if (checkApp) {
                return res.status(400).json({ message: 'You already applied for this position!' })
            }
            else {
                const newApplicatioon = new Application(application);
                newApplicatioon.save()
                    .then(() => {
                        return res.status(201).json(newApplicatioon);
                    })
                    .catch((error) => {
                        return res.status(404).json({ message: error.message });
                    });
            }
        });

}


export const postComments = async (req, res) => {
    try {
        const { lastCommentID } = req.query;
        let commentID = null;
        try {
            commentID = mongoose.Types.ObjectId(lastCommentID);
        } catch (err) {

        };
        const filter = commentID ? { _id: { $lt: commentID } } : {};
        filter['postID'] = req.params.id;
        const comments = await Comment.collection.aggregate([
            { $match: filter },
            { "$addFields": { "createdBy_id": { "$toObjectId": "$createdBy" } } },
            { $sort: { _id: -1 } },
            { $limit: commentsPageSize },
            {
                $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'commentator'
                }
            },
            { $unwind: { path: "$commentator", preserveNullAndEmptyArrays: true } },
            { $project: { "commentator.password": 0, "commentator.email": 0, "commentator._id": 0 } }
        ]).toArray();
        const hasComments = comments.length > 0;
        return res.status(200).json({ comments, lastCommentID: hasComments ? comments[comments.length - 1]._id : 'same' });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const createPost = (req, res) => {
    const post = {
        description: req.body?.description,
        title: req.body?.title,
        programmingLanguage: req.body?.programmingLanguage,
        workHours: req.body?.workHours,
        workPlace: req.body?.workPlace,
        requirements: req.body?.requirements
    };
    post['createdBy'] = req.user.id;
    post['type'] = req.user.role === 'student' ? 'request' : 'offer';
    const newPost = new Post(post);
     newPost.save()
        .then(() => {
            return res.status(201).json(newPost);
        })
        .catch((error) => {
            return res.status(404).json({ message: error.message });
        });
}

export const createComment = (req, res) => {
    const comment = {
        comment: req.body?.comment
    };
    comment['postID'] = req.params.id;
    comment['createdBy'] = req.user.id;
    const newComment = new Comment(comment);
     newComment.save()
        .then(() => {
            return res.status(201).json(newComment);
        })
        .catch((error) => {
            return res.status(404).json({ message: error.message });
        });
}

export const deletePost = async (req, res) => {
    const post = req.post;
    await post.deleteOne()
        .catch(err => { return res.status(404).json({ message: err.message }); });
    await Comment.deleteMany({ postID: post._id })
        .catch(err => { return res.status(404).json({ message: err.message }); });
    return res.status(200).json({ message: `Successfully deleted post with id ${post._id} and associated comments.` });
}

export const deleteComment =  (req, res) => {
     req.comment.deleteOne()
        .then(() => {
            return res.status(200).json({ message: `Successfully deleted comment with id ${req.comment._id}` })
        })
        .catch(err => {
            return res.status(404).json({ message: err.message });
        });
};

export const updateComment = async (req, res) => {
    const comment = req.comment;
    const updatedComment = req.body?.comment;
    if (!updatedComment)
        return res.status(404).json({ message: "We didn't recieve a comment!" });
    if (updateComment === req.comment.comment)
        return res.status(404).json({ message: "We didn't recieve a modified comment!" });
    comment.comment = updatedComment;
     comment.save()
        .then(() => {
            return res.status(200).json({ message: `Successfully updated comment with id ${comment.id}` });
        })
        .catch(err => { return res.status(404).json({ message: err.message }); });

};

export const getWorkPlaces = async (req, res) => {
    try {
        const workPlaces = await Post.find({}, 'workPlace');
        return res.status(200).json({ workPlaces });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
