const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


app = express();

app.use(bodyParser.urlencoded({ extended: true }))


const connectionString = 'mongodb+srv://alex:1@clusterproiect.d25lj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
        console.log('Connected to Database');

        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "views"));
        
        const db = client.db("JobPlatform");
        
        app.get('/', (req, res) => {
            db.collection('Posts').aggregate([   //join la tabele pentru a avea si numele firmei
            
                { $match : { type : "offer" }},
                { $lookup:
                    {
                        from: 'Users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'companie'
                    }
                }
            ]).toArray()
                .then(results => {
                    // console.log(results[1]['title']);
                    res.render("index", { posturi: results });
                })
                .catch(error => console.error(error));
        });

        app.get('/detaliiPost', (req, res) => { //transmitem informatile anuntului dorit catre pagina detalii post
            
            db.collection('Posts').aggregate([
            
                { $match : { _id: new ObjectID(req.query.id) }},
                { $lookup:
                    {
                        from: 'Users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'companie'
                    }
                }
            ]).toArray()
            .then(results => {
                // console.log(results);
                res.render("detaliiPost", { detalii: results[0]});
            })
            .catch(error => console.error(error));
        });
  })
  .catch(error => console.error(error));

app.listen(9999, () => {    
    console.log('listening on 9999');
});

