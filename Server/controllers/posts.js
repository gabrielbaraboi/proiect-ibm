import mongoose from "mongoose";
import Post from '../models/PostModel.js';
import Comment from '../models/CommentModel.js';

const postsPageSize=8;
const commentsPageSize=10;

export const getPosts = async (req, res) => {

    const {sorting, date, programmingLanguage, workHours, workPlace, type, createdBy} = req.query;
    
    try {
        
        const sorting_r=sorting==='asc'?1:-1;
        const date_r = new Date(date);
        const filter=!isNaN(date_r)?sorting_r===1?{dateCreated: {$gt: date_r}}:{dateCreated: {$lt: date_r}}:{};
        
        if(programmingLanguage) filter['programmingLanguage'] = { $in : programmingLanguage };
        if(workHours) filter['workHours'] = { $in : workHours };
        if(workPlace) filter['workPlace'] = { $in : workPlace };
        if(type) filter['type'] = {$in : type};
        if(createdBy) filter['createdBy'] = { $in : createdBy };
       
        const posts = await Post.collection.aggregate([   
            
                { $match : filter },
                { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
                {$sort : {dateCreated : sorting_r}},
                {$limit : postsPageSize},
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
        //Last loaded post date console.log(posts[pageSize-1].dateCreated); 
        const hasPosts=posts.length>0;   
        res.status(200).json({posts,lastPostDate:hasPosts?posts[posts.length-1].dateCreated:'same'});

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
            { $project : {"creator.password": 0, "creator.email": 0, "creator._id": 0 }}
            ]).next();
            
        const commentCount = await Comment.countDocuments({postID:req.params.id});
        res.header("Content-Type",'application/json');
        res.status(200).json( {post,commentCount} )

    } catch(error) {
        res.status(404).json( {message: error.message });
    }
}
export const postComments = async(req,res)=>{
    try {
    const {lastCommentDate} = req.query;
    const date = new Date(lastCommentDate);
    const filter=!isNaN(date)?{datePosted: {$lt: date}}:{};
    filter['postID']=req.params.id;
    const comments = await Comment.collection.aggregate([ 
        { $match : filter},
        { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
        {$sort : {datePosted : -1}},
        {$limit : commentsPageSize},
        { $lookup:
            {
                from: 'Users',
                localField: 'createdBy_id',
                foreignField: '_id',
                as: 'comentator'
            }
        },
        {$unwind : '$comentator'},
        { $project : { "comentator.password": 0, "comentator.email": 0, "comentator._id": 0 }}
    ]).toArray();
    const hasComments=comments.length>0;   
    res.status(200).json({comments,lastCommentDate:hasComments?comments[comments.length-1].datePosted:'same'});
    }catch(error) {
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
    const newPost = new Post(post);
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
    const newComment = new Comment(comment);
    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(404).json( {message: error.message });
    }
}

export const deletePost = async(req,res)=>{
    const postID = req.params.id;
    try{
    const post = await Post.findById(postID).exec();
    if(post.createdBy!==req.user.id&&req.user.role!=='admin')
        return res.status(403).json({message:"Post doesn't belong to user!"});
    await Post.findByIdAndDelete(postID).exec();
    await Comment.deleteMany({postID:postID});
    res.status(200).json({message:`Successfully deleted post with id ${postID} and associated comments.`});
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}
export const deleteComment = async(req,res)=>{
    const commentID=req.params.id;
    try{
    const comment = await Comment.findById(commentID);
    if(comment.createdBy!==req.user.id&&req.user.role!=='admin')
        return res.status(403).json({message:"Comment doesn't belong to user!"});
    await Comment.findByIdAndDelete(commentID);
    res.status(200).json({message:`Successfully deleted comment with commentID = ${commentID}`});
    }catch(err){
        res.status(404).json({message:error.message});
    }
};
