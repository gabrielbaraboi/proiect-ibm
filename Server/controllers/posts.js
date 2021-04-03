import mongoose from "mongoose";
import Post from '../models/PostModel.js';


export const getPosts = (req, res) => {
    try{
        Post.collection.aggregate([   //join la tabele pentru a avea si numele firmei
        
            { $match : { type : "offer" }},
            { "$addFields": {"createdBy_id" :  { "$toObjectId": "$createdBy" }}},
            { $lookup:
                {
                    from: 'Users',
                    localField: 'createdBy_id',
                    foreignField: '_id',
                    as: 'companie'
                }
            }
        ]).toArray()
            .then(results => {
                res.render("index", { posturi: results }); //trimitem rezultatul in index.ejs prin varibila posturi

            })
            .catch(error => console.error(error));
    }
    catch {
        res.status(404).json({message:error.message});
    }
}

export const postDetails = (req, res) => {
    try{
        Post.collection.aggregate([ //join la tabele pentru a avea si numele firmei
            
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
            ]).toArray()
            .then(results => {
                res.render("detaliiPost", { detalii: results[0]}); //trimitem rezultatul in detaliiPost.ejs prin varibila posturi
            })
            .catch(error => console.error(error));
    }
    catch {
        res.status(404).json({message:error.message});
    }
}
