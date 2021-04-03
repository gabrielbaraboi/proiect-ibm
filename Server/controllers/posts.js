import Post from '../models/PostModel.js';
import mongoose from 'mongoose';
import MongoClient from 'mongodb';
export const getPosts =  (req,res)=>{
    /*try{
        console.log(Post);
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
    ]).toArray().then((results)=>{console.log(results)}).catch((error)=>{console.log(error)});
    console.log("Got here!");
   // res.status(200).json(postMessages);
   
    }
    catch{
    res.status(404).json({message:error.message});
    }
    */
    var url = "mongodb+srv://alex:1@clusterproiect.d25lj.mongodb.net/JobPlatform?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("IBMPlatform");
    var query = {};
    dbo.collection("Posts").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
    }); 
};

export const postDetails = (req,res)=>{
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
            res.status(200).json(results[0]); //trimitem rezultatul in detaliiPost.ejs prin varibila posturi
        })
        .catch((error)=>{res.status(404).json({message:error.message})});
    };
