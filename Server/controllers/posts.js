import mongoose from "mongoose";
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';

export const getPosts = async (req, res) => {

    try {
        const posts = await Post.collection.aggregate([   
            
                { $match : {}},
                { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
                { $lookup:
                    {
                        from: 'Users',
                        localField: 'createdBy_id',
                        foreignField: '_id',
                        as: 'creator'
                    }
                },
                {$unwind : '$creator'},
                {$project : { "createdBy_id": 0, "creator.password": 0, "creator.email": 0, "creator._id": 0 }}
            ]).toArray();

        res.status(200).json(posts)

    } catch(error) {
        res.status(404).json( {message: error.message });
    }
}

export const postDetails = async (req, res) => {
    try {
        const post = await Post.collection.aggregate([ 
            
            { $match : { _id: mongoose.Types.ObjectId(req.params.id) }},
            { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
            { $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'creator'
                }
            },
            {$unwind : '$creator'},
            { $project : { "createdBy_id": 0, "creator.password": 0, "creator.email": 0, "creator._id": 0 }}
            ]).toArray();
            
        const comments = await Comment.collection.aggregate([ 
            { $match : { postID: req.params.id }},
            { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
            { $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'comentator'
                }
            },
            {$unwind : '$comentator'},
            { $project : { "comentator.createdBy_id": 0, "comentator.password": 0, "comentator.email": 0, "comentator._id": 0 }}
        ]).toArray();
        
        res.header("Content-Type",'application/json');
        res.status(200).json( {post, comments} )

    } catch(error) {
        res.status(404).json( {message: error.message });
    }
}
