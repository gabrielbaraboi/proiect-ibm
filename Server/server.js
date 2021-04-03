import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"




import Post from './dbModels/PostModel.js';
// import User from './dbModels/UserModel.js';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))


app.set("view engine", "ejs");
app.set("views", "../views");

const connectionString = 'mongodb+srv://alex:1@clusterproiect.d25lj.mongodb.net/JobPlatform?retryWrites=true&w=majority';

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .catch(error => console.error(error));


app.get('/', (req, res) => {
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
});

app.get('/detaliiPost', (req, res) => { //transmitem informatile anuntului dorit catre pagina detalii post
    
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
    });

app.listen(9999, () => {    
    console.log('listening on 9999');
});
