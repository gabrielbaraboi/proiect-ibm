import mongoose from "mongoose";
import Post from '../models/PostModel.js';


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
                {$unwind : '$creator'}
            ]).toArray();

        res.status(200).json(posts)

    } catch(error) {
        res.status(404).json( {message: error.message });
    }
}

export const postDetails = async (req, res) => {
    try {
        const post = await Post.collection.aggregate([ 
            
            { $match : { _id: mongoose.Types.ObjectId(req.query.id) }},
            { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
            { $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'companie'
                }
            }
            ]).toArray();
            
        res.status(200).json(post)

    } catch(error) {
        res.status(404).json( {message: error.message });
    }
}
