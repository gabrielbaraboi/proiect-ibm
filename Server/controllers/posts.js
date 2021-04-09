import mongoose from "mongoose";
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';
import PostModel from "../models/PostModel.js";
import CommentModel from "../models/CommentModel.js";


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

        res.status(200).json(posts);

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
            ]).next();
            
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
export const createPost = async(req,res)=>{

    const post = {
        description: req.body.description,
        title: req.body.title,
        programmingLanguage: req.body.programmingLanguage,
        workHours: req.body.workHours,
        workPlace: req.body.workPlace,
        requirements: req.body.requirements
    };
    post['createdBy']=req.user.id;
    post['type']=req.user.role==='student'?'request':'offer';
    const newPost = new PostModel(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404).json( {message: error.message });
    }

}
export const createComment = async(req,res)=>{
    const comment = {
        comment:req.body.comment
    };
    comment['postID']=req.params.id;
    comment['createdBy']=req.user.id;
    const newComment = new CommentModel(comment);
    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(404).json( {message: error.message });
    }
}
